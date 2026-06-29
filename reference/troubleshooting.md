# Troubleshooting

### Common Issues

#### "Insufficient funds" / Gas errors

* Ensure your wallet has BNB on BNBChain Testnet
* Get test tokens from the [Faucet](https://www.bnbchain.org/en/testnet-faucet)
* Check you're connected to the correct network (Testnet vs Mainnet)

#### "Permission denied" / Auth errors

* Check the agent's key env is set — `MEMBASE_PRIVATE_KEY` (Membase 2.0), or `MEMBASE_ACCOUNT` / `MEMBASE_SECRET_KEY` (AIP / legacy 1.x).
* **Membase 2.0:** read access is by **domain** membership — confirm the wallet was invited to the domain (see [Domains & Encryption](../membase/authorization.md)).
* **AIP / legacy 1.x:** register the agent on-chain and grant cross-agent access via the chain helper (`register` / `buy`).

#### Connection / Timeout errors

* Check your network can reach the RPC and Hub endpoints
* Verify `CHAIN_TYPE` matches your target network (e.g. `opbnb-testnet`)
* For firewall/proxy environments, ensure outbound HTTPS is allowed

#### Import errors (Python)

* Use Python 3.10 or higher
* Create a fresh virtual environment: `python -m venv venv && source venv/bin/activate`
* Reinstall the SDK you use — Membase 2.0: `pip install --upgrade "unibase-membase-sdk @ git+https://github.com/unibaseio/unibase-membase.git"` (or `aip-agent` / legacy `membase` for those products)

### Getting Help

* [Telegram Community](https://t.me/unibase_ai)
* [Support Email](mailto:support@unibase.com)
* [GitHub Issues](https://github.com/unibaseio) — report bugs per repository
