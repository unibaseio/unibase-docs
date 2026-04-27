# Membase

Decentralized memory layer for AI agents — persistent, verifiable storage for conversations, knowledge bases, and on-chain task coordination. **SDK**, **MCP**, or **Skill** integration.

### 30-Second Example

```python
pip install git+https://github.com/unibaseio/membase.git
```

```python
from membase.memory.buffered_memory import BufferedMemory
from membase.memory.message import Message

memory = BufferedMemory(membase_account="default", auto_upload_to_hub=True)
memory.add(Message(name="my-agent", content="Hello!", role="assistant", metadata=""))
# View at https://hub.membase.unibase.com
```

### Why Membase

| vs. Centralized DB | vs. Local Storage |
|--------------------|------------------|
| Verifiable on-chain | Syncs to Hub, survives restarts |
| ZK-verified access | Multi-agent shared memory |
| MCP/Skill — no custom backend | Chain tasks for collaborative rewards |

### Integration Options

| Option | Best for | Setup |
|--------|----------|-------|
| **SDK** | Custom agents, full control | `pip install git+https://github.com/unibaseio/membase.git` |
| **MCP** | Claude Desktop, Cline, etc. | [membase-mcp](https://github.com/unibaseio/membase-mcp) |
| **Skill** | BitAgent, skill-based frameworks | Install skill, configure |

### Next Steps

* [Quick Start](quick-start/README.md) — Multi-Memory, Knowledge Base, Chain Tasks
* [Integration Options](integration-options.md)
* [Architecture](architecture.md)

### Resources

* [Membase GitHub](https://github.com/unibaseio/membase) · [Memory Hub](https://hub.membase.unibase.com)
