# Troubleshooting

### Common Issues

#### "Insufficient funds" / Gas errors

* Ensure your wallet has BNB on BNBChain Testnet
* Get test tokens from the [Faucet](https://www.bnbchain.org/en/testnet-faucet)
* Check you're connected to the correct network (Testnet vs Mainnet)

#### "Permission denied" / Auth errors

* Verify `MEMBASE_ACCOUNT` and `MEMBASE_SECRET_KEY` are set correctly
* Ensure the agent is registered on-chain: `membase_chain.register(agent_name)`
* For cross-agent access, use `membase_chain.buy(owner, new_agent)` to grant permission

#### Connection / Timeout errors

* Check your network can reach the RPC and Hub endpoints
* Verify `CHAIN_TYPE` matches your target network (e.g. `opbnb-testnet`)
* For firewall/proxy environments, ensure outbound HTTPS is allowed

#### Import errors (Python)

* Use Python 3.10 or higher
* Create a fresh virtual environment: `python -m venv venv && source venv/bin/activate`
* Reinstall: `pip install --upgrade git+https://github.com/unibaseio/membase.git`

### Getting Help

* [Telegram Community](https://t.me/unibase_ai)
* [Support Email](mailto:support@unibase.com)
* [GitHub Issues](https://github.com/unibaseio) — report bugs per repository
