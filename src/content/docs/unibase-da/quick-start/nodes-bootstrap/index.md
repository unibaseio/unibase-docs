---
title: "Nodes Bootstrap"
---

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
export CHAIN_TYPE=base-sepolia
```

### Quick Links

* [Storage Node](/unibase-da/quick-start/nodes-bootstrap/storage-node/)
* [Validator Node](/unibase-da/quick-start/nodes-bootstrap/validator-node/)
* [Stream Node](/unibase-da/quick-start/nodes-bootstrap/stream-node/)
* [Docker](/unibase-da/quick-start/nodes-bootstrap/docker/)

### Gateway Server

* https://gateway.unibase.com/

### Explorer

[explorer.unibase.com](https://explorer.unibase.com)
