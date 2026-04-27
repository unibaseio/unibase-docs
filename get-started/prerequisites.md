# Prerequisites

### 1. Wallet Setup

Install [MetaMask](https://metamask.io/) or a compatible Web3 wallet. Create or import an account.

**Security**: Never commit private keys or secret keys. Use environment variables.

### 2. Get Tokens

For **Membase** and **AIP**:

* **Mainnet**: Use BNB on BNBChain Mainnet for production. [bscscan.com](https://bscscan.com/)
* **Testnet**: [BNB Faucet](https://www.bnbchain.org/en/testnet-faucet) for test BNB
* Add BNB Chain (Mainnet or Testnet) to your wallet
* You need a small amount of BNB for gas

### 3. Environment Requirements

| Module | Runtime | Version |
|--------|---------|---------|
| Membase | Python | 3.10+ |
| AIP | Python | 3.10+ |
| Unibase DA | Go | 1.20+ |
| Unibase Pay | Any (HTTP API) | — |

### 4. Network Configuration

| Network | RPC (example) | Chain ID |
|---------|---------------|----------|
| BNB Chain Mainnet | https://bsc-dataseed.binance.org | 56 |
| BNB Chain Testnet | https://data-seed-prebsc-1-s1.binance.org:8545 | 97 |
| OPBNB Testnet | https://opbnb-testnet-rpc.bnbchain.org | 5611 |

### 5. Supported Networks

See [Supported Networks](../overview/supported-networks.md) for full list and status.
