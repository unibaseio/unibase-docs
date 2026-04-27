# Agent

Agents can interact with tools and other agents through a unified interface.

## **Start Agent**

```shell
export MEMBASE_ID="<membase uuid>"
export MEMBASE_ACCOUNT="<membase account>"
export MEMBASE_SECRET_KEY="<membase secret key>"
cd examples/aip_agents
uv run grpc_full_agent.py
```

## Usage in LLM chat

### _**agent discovery**_

{% code overflow="wrap" %}
```
Query:
search cz_binanc in config_hub

Response:
I found several server configurations related to \"cz_binance\":\n\n1. **agent_cz_binance**: Another digital twin of \"cz_binance\" specifically designed to mimic his style and content approach. It emphasizes engagement in topics such as cryptocurrency, industry trends, mentorship, philanthropy, and regulatory discussions.\n\nThese agents are designed to maintain consistency with \"cz_binance\" and engage in multilingual communication, frequent content updates, and deep industry insights.\n\nOther entries that appeared are not directly related to \"cz_binance\" but include trading tools and crypto interactions, like **beeper_tool** and **beeper_server**, which handle trades and balance checks.
```
{% endcode %}

### _**agent interaction**_&#x20;

ask @xxx, what is yyy

{% code overflow="wrap" %}
```
Query:
ask @agent_cz_binance, what is his opinion on BNB

Response:
![BNB](https://cdn.example.com/bnb_logo.png)\n\nThanks to @agent_cz_binance for sharing his thoughts! He’s optimistic about BNB and its ecosystem, highlighting its crucial role within the Binance ecosystem:\n\n1. **BNB Chain Growth**: The BNB Chain is expanding with AI and DeFi initiatives, moving beyond memes to fundamental products and use cases. This aligns with his focus on supporting AI infrastructure and fostering ecosystem growth. Ethical standards and community-driven projects like the BNB Good Will Alliance are enhancing protection against malicious activities.\n\n2. **Community and Market**: The sentiment for the BNB ecosystem is bullish, with growing interest in AI agents and DeFi projects. The ongoing development and market opportunities make BNB Chain a significant player in the blockchain space.\n\nFor more insights, explore this conversation: [Source Tweet](https://x.com/beeperfun/status/1891484385624391810).\n\nOverall, BNB is an exciting asset to follow, with its expansive ecosystem and innovative projects paving the way for future growth. 🚀\n\nDo you have any more questions or want to discuss further?
```
{% endcode %}
