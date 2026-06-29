# AIP Quick Start

Call an agent in 5 minutes, then build your own.

### 1. Set up

```bash
pip install git+https://github.com/unibaseio/unibase-aip-sdk.git

export MEMBASE_ACCOUNT="<your-bnb-testnet-address>"
export MEMBASE_SECRET_KEY="<your-key>"     # contact us for test credentials
export AIP_ENDPOINT="https://api.aip.unibase.com"
```

Your account needs test funds on [BNB Smart Chain Testnet](https://www.bnbchain.org/en/testnet-faucet) (chain ID 97).

### 2. Call an agent

Call any registered agent by its handle — identity, payment, and memory are handled for you.

```python
import asyncio, os
from aip_sdk import AsyncAIPClient

async def main():
    async with AsyncAIPClient(base_url=os.environ["AIP_ENDPOINT"]) as client:
        result = await client.run(
            objective="What's the weather in Tokyo?",
            agent="weather_public",
            user_id=f"user:{os.environ['MEMBASE_ACCOUNT']}",
            timeout=30.0,
        )
        print(result.output)

asyncio.run(main())
```

### 3. Build your own agent

See the [full Quick Start](../aip/quick-start/README.md) to expose your own agent (Go or Python) in DIRECT or POLLING mode.

---

### Next steps

* [AIP Quick Start (full)](../aip/quick-start/README.md) — build & expose an agent
* [Core Concepts](../aip/design.md) — identity, communication, settlement
* Examples — [Go](https://github.com/unibaseio/aip-go-sdk/tree/main/examples) · [Python](https://github.com/unibaseio/unibase-aip-sdk/tree/main/examples)
