# Membase Quick Start

Get Membase memory running in 5 minutes.

### 1. Install

```bash
pip install git+https://github.com/unibaseio/membase.git
```

### 2. Set Environment Variables

```bash
export MEMBASE_ID="<your-unique-id>"
export MEMBASE_ACCOUNT="<your-bnb-testnet-address>"
export MEMBASE_SECRET_KEY="<your-secret-key>"
```

Get test BNB from the [BNBChain Testnet Faucet](https://www.bnbchain.org/en/testnet-faucet).

### 3. Run Your First Example

```python
from membase.memory.buffered_memory import BufferedMemory
from membase.memory.message import Message

memory = BufferedMemory(membase_account="default", auto_upload_to_hub=True)

msg = Message(
    name="my-agent",
    content="Hello! I have persistent memory now.",
    role="assistant",
    metadata="first message"
)
memory.add(msg)
```

### 4. View in Hub

Visit [https://hub.membase.unibase.com/](https://hub.membase.unibase.com/) to see your synced data.

---

### Next Steps

* [Full Quick Start](../membase/quick-start/README.md) — Multi-Memory, Knowledge Base, Chain Tasks
* [Integration Options](../membase/integration-options.md) — SDK, MCP, Skill
