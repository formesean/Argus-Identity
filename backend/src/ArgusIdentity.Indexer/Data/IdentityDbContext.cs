using Argus.Sync.Data;
using ArgusIdentity.Indexer.Models;
using Microsoft.EntityFrameworkCore;

namespace ArgusIdentity.Indexer.Data;

public class IdentityDbContext(DbContextOptions options, IConfiguration configuration)
  : CardanoDbContext(options, configuration)
{
  public DbSet<WalletTransaction> WalletTransactions => Set<WalletTransaction>();
  public DbSet<WalletUtxo> WalletUtxos => Set<WalletUtxo>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<WalletTransaction>(entity => {
      entity.HasKey(e => e.TxHash);
      entity.HasIndex(e => e.SenderAddress);
      entity.HasIndex(e => e.Timestamp);
    });

    modelBuilder.Entity<WalletUtxo>(entity => {
      entity.HasKey(e => new { e.TxHash, e.OutputIndex });
      entity.HasIndex(e => e.Address);
    });
  }
}
