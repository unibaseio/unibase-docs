# Unibase DA Quick Start

### 1. Clone & Build

```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
```

### 2. Upload File

```bash
export CHAIN_TYPE=opbnb-testnet  # or op-sepolia, bnb-testnet
cd example/upload
go build
./upload --path=./your-file --sk=<secret_key>
```

### 3. Download File

```bash
cd example/download
go build
./download --name=<file_name> --path=./save-dir --sk=<secret_key>
```

### Supported Networks

| Network | CHAIN_TYPE |
|---------|------------|
| OPBNB Testnet | opbnb-testnet |
| OP Sepolia | op-sepolia |
| BNB Testnet | bnb-testnet |

### Next Steps

* [Nodes Bootstrap](nodes-bootstrap/README.md) — Run Stream, Storage, or Validator nodes
* [Nodes Operations](nodes-operations.md)
