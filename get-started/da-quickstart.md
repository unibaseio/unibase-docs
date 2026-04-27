# Unibase DA Quick Start

Upload and verify data with the Unibase DA SDK in 5 minutes.

### 1. Clone SDK

```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
```

### 2. Set Environment

```bash
export CHAIN_TYPE=opbnb-testnet
```

### 3. Upload a File

```bash
go run upload.go --path=./your-file --sk=<your-secret-key>
```

### 4. Supported Networks

| Network | Status |
|---------|--------|
| OPBNB Testnet | ✅ Live |
| OP Sepolia | ✅ Live |
| BNB Testnet | ✅ Live |

### 5. Data Flow

```
Your file → Reed-Solomon encoding → Distributed storage nodes → On-chain verification
```

---

### Next Steps

* [Full Quick Start](../unibase-da/quick-start/README.md)
* [Node Operations](../unibase-da/quick-start/nodes-bootstrap/) — Run Storage, Validator, or Stream nodes
* [Docker](../unibase-da/quick-start/nodes-bootstrap/docker.md)
