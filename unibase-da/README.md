# Unibase DA

High-performance data availability layer for AI — **on-chain ZK verification**, **honest-one** security (no majority assumption), **100 GB/s** throughput. Powers Membase.

### 30-Second Example

```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
export CHAIN_TYPE=opbnb-testnet
cd example/upload && go build && ./upload --path=./file --sk=<secret_key>
```

### Why Unibase DA

| vs. EigenDA/Celestia | Unibase DA |
|----------------------|------------|
| Off-chain verification | **On-chain ZK** |
| Honest majority | **Honest one** |
| 10 MB/s – 50 GB/s | **100 GB/s** |
| Validity proofs | **Fraud proofs** |

### Node Types

| Type | Role |
|------|------|
| **Stream** | Encode data; reward on proof submission |
| **Storage** | Store encoded data; submit proofs; epoch rewards |
| **Validator** | Watch proofs; challenge if wrong; earn rewards |

### Supported Networks

* OPBNB Testnet · OP Sepolia · BNB Testnet

### Next Steps

* [Quick Start](quick-start/README.md)
* [Nodes Bootstrap](quick-start/nodes-bootstrap/README.md)
* [Nodes Operations](quick-start/nodes-operations.md)

### Resources

* [unibase-da-sdk](https://github.com/unibaseio/unibase-da-sdk)
