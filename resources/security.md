# Security & Best Practices

### Key Management

* **Never commit** private keys, secret keys, or mnemonics to version control
* Use **environment variables** for `MEMBASE_SECRET_KEY`, `MEMBASE_ACCOUNT`, and similar
* Prefer **testnet** for development and experimentation

### Wallet Security

* Use a dedicated wallet for development — keep mainnet assets separate
* Rotate keys if they may have been exposed
* For production, consider hardware wallets or secure key management services

### Network Security

* Verify you're connected to the correct network (Testnet vs Mainnet)
* Double-check contract addresses and API URLs before sending transactions
* Use official links from this documentation

### Data & Privacy

* Membase data is stored on decentralized nodes; understand your data flow
* AIP uses on-chain identity verification; permissions are programmable
* Review authorization logic before granting cross-agent access

### Reporting Vulnerabilities

If you discover a security issue, please contact [support@unibase.com](mailto:support@unibase.com) before public disclosure.
