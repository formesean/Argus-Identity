using Argus.Sync.Data.Models;

namespace ArgusIdentity.Indexer.Models;

public record WalletUtxo(
  string TxHash,
  int OutputIndex,
  string Address,
  ulong LovelaceAmount,
  string? AssetPolicyId,
  string? AssetName
) : IReducerModel;
