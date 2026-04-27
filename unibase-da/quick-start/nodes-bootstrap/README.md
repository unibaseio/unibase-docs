# Nodes Bootstrap

Run Unibase DA nodes: **Stream** (encode), **Storage** (store + prove), **Validator** (watch + challenge).

### Node Types

| Type | Role | Reward |
|------|------|--------|
| **Stream** | Encode data as configured | Submit encode proof to chain |
| **Storage** | Store encoded data; submit proofs | Epoch proof rewards |
| **Validator** | Watch proofs; challenge if wrong | Challenge rewards |

### Download

[Unibase DA SDK](https://github.com/unibaseio/unibase-da-sdk)

### Environment

```bash
export CHAIN_TYPE=opbnb-testnet  # or op-sepolia, bnb-testnet
```

### Quick Links

* [Storage Node](storage-node.md)
* [Validator Node](validator-node.md)
* [Stream Node](stream-node.md)
* [Docker](docker.md)

### Gateway Server

* https://gateway.membase.unibase.com/

### Explorer

[testnet.explorer.unibase.com](https://www.testnet.explorer.unibase.com)
