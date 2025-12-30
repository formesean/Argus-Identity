using Argus.Sync.Data.Models;

namespace ArgusIdentity.Indexer.Models;

public record WalletTransaction(
  string TxHash,
  ulong Slot,
  DateTime Timestamp,
  string SenderAddress,
  ulong Fee,
  bool IsSmartContractInteraction
) : IReducerModel;
