# Unibase DA Quick Start

### 1. Clone & Build

```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
```

### 2. Upload File

```bash
export CHAIN_TYPE=base-sepolia
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
| Base Sepolia (testnet) | `base-sepolia` |
| Base Mainnet (roadmap) | `base` |
| Ethereum Mainnet (roadmap) | `ethereum` |

### Next Steps

* [Nodes Bootstrap](nodes-bootstrap/README.md) — Run Stream, Storage, or Validator nodes
* [Nodes Operations](nodes-operations.md)
