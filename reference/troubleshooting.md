# Troubleshooting

### Common Issues

#### "Insufficient funds" / Gas errors

* Ensure your wallet has BNB on BNBChain Testnet
* Get test tokens from the [Faucet](https://www.bnbchain.org/en/testnet-faucet)
* Check you're connected to the correct network (Testnet vs Mainnet)

#### "Permission denied" / Auth errors

* Check the agent's key env is set — `MEMBASE_PRIVATE_KEY` (Membase 2.0), or `MEMBASE_ACCOUNT` / `MEMBASE_SECRET_KEY` (AIP wallet; legacy Membase 1.x).
* **Membase 2.0:** read access is by **domain** membership — confirm the wallet was invited to the domain (see [Domains & Encryption](../membase/authorization.md)).
* **AIP:** the agent registers with the AIP platform on start (ERC-8004 identity) — confirm `AIP_ENDPOINT` and the wallet env are set, and the agent reached the platform.

#### Connection / Timeout errors

* Check your network can reach the RPC and Hub endpoints
* Verify `CHAIN_TYPE` matches your target network (e.g. `opbnb-testnet`)
* For firewall/proxy environments, ensure outbound HTTPS is allowed

#### Import errors (Python)

* Use Python 3.10 or higher
* Create a fresh virtual environment: `python -m venv venv && source venv/bin/activate`
* Reinstall the SDK you use — Membase 2.0: `pip install --upgrade "unibase-membase-sdk @ git+https://github.com/unibaseio/unibase-membase.git"` (AIP: `aip-go-sdk` / `unibase-aip-sdk`; legacy `membase` for 1.x)

### Getting Help

* [Telegram Community](https://t.me/unibase_ai)
* [Support Email](mailto:support@unibase.com)
* [GitHub Issues](https://github.com/unibaseio) — report bugs per repository
