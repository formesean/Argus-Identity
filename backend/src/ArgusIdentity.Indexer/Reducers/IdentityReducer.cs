using Argus.Sync.Reducers;
using ArgusIdentity.Indexer.Data;
using ArgusIdentity.Indexer.Models;
using Chrysalis.Cbor.Types.Cardano.Core;
using Chrysalis.Cbor.Extensions.Cardano.Core;
using Chrysalis.Cbor.Extensions.Cardano.Core.Header;
using Chrysalis.Cbor.Extensions.Cardano.Core.Transaction;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ArgusIdentity.Indexer.Reducers;

public class IdentityReducer(IDbContextFactory<IdentityDbContext> dbContextFactory)
  : IReducer<WalletTransaction>
{
  public async Task RollForwardAsync(Block block)
  {
    using var db = dbContextFactory.CreateDbContext();

    var slot = block.Header().HeaderBody().Slot();
    var timestamp = DateTime.UtcNow;

    var txBodies = block.TransactionBodies().ToList();
    var txHashes = txBodies.Select(t => t.Hash()).ToList();

    // 1. Check existing transactions
    var existingTxHashes = await db.WalletTransactions
      .Where(t => txHashes.Contains(t.TxHash))
      .Select(t => t.TxHash)
      .ToListAsync();
    var existingTxSet = new HashSet<string>(existingTxHashes);

    // 2. Check existing utxos
    var existingUtxoKeys = await db.WalletUtxos
      .Where(u => txHashes.Contains(u.TxHash))
      .Select(u => new { u.TxHash, u.OutputIndex })
      .ToListAsync();
    var existingUtxoSet = new HashSet<(string, int)>(existingUtxoKeys.Select(k => (k.TxHash, k.OutputIndex)));

    // 3. Process transactions
    foreach (var tx in txBodies)
    {
      var txHash = tx.Hash();
      if (existingTxSet.Contains(txHash)) continue;

      bool isContract = tx.ScriptDataHash() != null;

      db.WalletTransactions.Add(new WalletTransaction(
        txHash,
        slot,
        timestamp,
        "unknown_sender",
        tx.Fee(),
        isContract
      ));
    }

    // 4. Process outputs
    foreach (var tx in txBodies)
    {
      var txHash = tx.Hash();

      int index = 0;
      if (tx.Outputs() != null)
      {
        foreach (var output in tx.Outputs())
        {
          // Skip if this specific utxo already exists
          if (existingUtxoSet.Contains((txHash, index)))
          {
            index++;
            continue;
          }

          var address = Convert.ToHexString(output.Address().ToArray());
          var val = output.Amount();
          ulong amount = GetLovelace(val);

          db.WalletUtxos.Add(new WalletUtxo(
            txHash,
            index++,
            address,
            amount,
            null,
            null
          ));
        }
      }
    }

    if (db.ChangeTracker.HasChanges())
    {
      await db.SaveChangesAsync();
    }
  }

  public async Task RollBackwardAsync(ulong slot)
  {
    using var db = dbContextFactory.CreateDbContext();

    // 1. Identify which transactions are being rolled back
    var txsToDelete = await db.WalletTransactions
      .Where(t => t.Slot >= slot)
      .Select(t => t.TxHash)
      .ToListAsync();

    if (txsToDelete.Count == 0) return;

    // 2. Delete the utxos first (foreign key logic)
    await db.WalletUtxos
      .Where(u => txsToDelete.Contains(u.TxHash))
      .ExecuteDeleteAsync();

    // 3. Delete the transactions
    await db.WalletTransactions
      .Where(t => t.Slot >= slot)
      .ExecuteDeleteAsync();
  }

  private ulong GetLovelace(object val)
  {
    if (val == null) return 0;
    if (val is ulong u) return u;

    var type = val.GetType();
    var props = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

    foreach (var name in new[] { "Coin", "Lovelace", "Amount", "Item1" })
    {
      var prop = props.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
      if (prop != null && (prop.PropertyType == typeof(ulong) || prop.PropertyType == typeof(ulong?)))
      {
        var v = prop.GetValue(val);
        return v is ulong ul ? ul : 0;
      }
    }

    var firstUlong = props.FirstOrDefault(p => p.PropertyType == typeof(ulong));
    if (firstUlong != null)
    {
      var v = firstUlong.GetValue(val);
      return v is ulong ul ? ul : 0;
    }

    return 0;
  }
}
