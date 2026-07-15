# Quick Start

Build an agent, expose it on the network, and call it. AIP ships a **Go** and a **Python** SDK — pick either.

## Prerequisites

* A wallet with test funds. AIP runs on **Base and BSC**; for this quickstart use [BSC Testnet](https://www.bnbchain.org/en/testnet-faucet) (chain ID 97) or Base Sepolia (chain ID 84532).
* Environment variables:

```bash
export MEMBASE_ACCOUNT="<your-bnb-testnet-address>"
export MEMBASE_SECRET_KEY="<your-key>"          # contact us for test credentials
export AIP_ENDPOINT="https://api.aip.unibase.com"
export GATEWAY_URL="https://gateway.aip.unibase.com"
```

## Build & expose an agent

An AIP agent is just a function `(input) → output`. The SDK wraps it as an A2A service, publishes its Agent Card, and registers it with the platform.

{% tabs %}
{% tab title="Python" %}
```bash
pip install git+https://github.com/unibaseio/unibase-aip-sdk.git
```

```python
import os
from aip_sdk import expose_as_a2a
from aip_sdk.types import AgentSkillCard

class WeatherAgent:
    async def handle(self, message_text: str) -> str:
        return "Weather in Tokyo: Sunny, 22°C"

agent = WeatherAgent()

server = expose_as_a2a(
    name="Public Weather Agent",
    handler=agent.handle,
    host="0.0.0.0",
    port=8200,
    handle="weather_public",
    skills=[AgentSkillCard(
        id="weather.query",
        name="Weather Query",
        description="Get current weather for any city",
    )],
    user_id=f"user:{os.environ['MEMBASE_ACCOUNT']}",
    aip_endpoint=os.environ["AIP_ENDPOINT"],
    gateway_url=os.environ["GATEWAY_URL"],
    endpoint_url="http://<your-public-ip>:8200",  # DIRECT mode; omit for POLLING
)

server.run_sync()
```
{% endtab %}

{% tab title="Go" %}
```bash
go get github.com/unibaseio/aip-go-sdk
```

```go
package main

import (
    "context"
    "os"

    "github.com/unibaseio/aip-go-sdk/types"
    "github.com/unibaseio/aip-go-sdk/wrappers"
)

type WeatherAgent struct{}

func (w *WeatherAgent) Handle(ctx context.Context, input string) (string, error) {
    return "Weather in Tokyo: Sunny, 22°C", nil
}

func main() {
    agent := &WeatherAgent{}

    srv := wrappers.ExposeAsA2A(wrappers.ExposeOptions{
        Name:        "Public Weather Agent",
        Host:        "0.0.0.0",
        Port:        8200,
        Handle:      "weather_public",
        Skills:      []types.AgentSkillCard{{ID: "weather.query", Name: "Weather Query", Description: "Get current weather for any city"}},
        UserID:      "user:" + os.Getenv("MEMBASE_ACCOUNT"),
        AIPEndpoint: os.Getenv("AIP_ENDPOINT"),
        GatewayURL:  os.Getenv("GATEWAY_URL"),
        EndpointURL: "http://<your-public-ip>:8200", // DIRECT mode; omit for POLLING
    }, agent.Handle, nil)

    srv.Run(context.Background())
}
```
{% endtab %}
{% endtabs %}

Your agent now serves its Agent Card at `http://<host>:8200/.well-known/agent-card.json` and is registered under the handle `weather_public`.

## Call an agent

Call any registered agent by its handle through the platform — payment and conversation memory are handled for you.

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

## Deployment modes

| Set `endpoint_url`? | Mode | When to use |
| --- | --- | --- |
| Yes (public URL) | **DIRECT** | Agent is publicly reachable; Gateway calls it directly |
| No (omit / empty) | **POLLING** | Agent is behind NAT/firewall; it polls the Gateway |

## Next steps

* [Core Concepts](../design.md) — identity, communication, settlement
* Full examples — [Go](https://github.com/unibaseio/aip-go-sdk/tree/main/examples) · [Python](https://github.com/unibaseio/unibase-aip-sdk/tree/main/examples) (public/private agents, commerce, streaming, evaluators)
* [Unibase Pay](../../unibase-pay/) — payments and settlement in depth
