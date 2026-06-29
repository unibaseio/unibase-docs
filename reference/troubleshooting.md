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

### Memory & Recall (Membase)

#### `memory.ingest` / `memory.answer` raises ImportError

* These need the LLM extras: `pip install "unibase-membase-sdk[recovery,runtime]"`.
* `memory.ingest` also needs an LLM key (e.g. `OPENAI_API_KEY`); raw `set`/`get` do not.

#### Recall returns nothing / stale results

* Pass the right `query_date` — observations are filtered to those valid at that date, so a current fact won't show for a past date (and vice versa).
* Confirm the session was ingested (`memory.ingest(...)`) before querying; recall reads the local store, not raw turns.

#### "value not encrypted under this domain" on read

* You're decrypting with the wrong domain key. Read with the correct domain handle, and name the `author` whose value you want (`get(key, author=...)`).
* For shared domains, ensure the wallet **accepted the invite** (`accept_invite`) so it holds the domain key.

#### Hub write/read appears to do nothing

* Writes are wallet-signed; verify the agent's wallet/key is set and the Hub URL is reachable.
* The Hub returns the latest value per `(owner, id)` — re-writing the same key overwrites; use distinct keys for history.

### Settlement & metering (Membase Server)

* Metering/settlement require a **Server URL** — agent-direct memory works without one.
* On-chain flush needs the wallet funded with gas on the settlement chain and the configured token (e.g. `UB`); a stuck flush is usually insufficient allowance/balance.

### Unibase DA

* Uploads need a reachable **stream node** + Hub for your `CHAIN_TYPE` (e.g. `base-sepolia`); a timeout usually means the stream node is unreachable or under-provisioned.
* After upload, a piece must be registered on-chain within the staging window or it falls out of staging — retry the upload.

### Getting Help

* [Telegram Community](https://t.me/unibase_ai)
* [Support Email](mailto:support@unibase.com)
* [GitHub Issues](https://github.com/unibaseio) — report bugs per repository
