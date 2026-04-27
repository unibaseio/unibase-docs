# Membase Quick Start

### 1. Install & Env

```bash
pip install git+https://github.com/unibaseio/membase.git
export MEMBASE_ID="<unique-id>"
export MEMBASE_ACCOUNT="<bnb-address>"
export MEMBASE_SECRET_KEY="<secret-key>"
```

Get test BNB: [BNBChain Faucet](https://www.bnbchain.org/en/testnet-faucet)

### 2. Multi-Memory (Conversations)

```python
from membase.memory.multi_memory import MultiMemory
from membase.memory.message import Message

mm = MultiMemory(membase_account="default", auto_upload_to_hub=True, preload_from_hub=True)
mm.add(Message(name="agent", content="Hello!", role="assistant", metadata=""), conversation_id="conv-1")
```

### 3. Knowledge Base (RAG)

```python
from membase.knowledge.chroma import ChromaKnowledgeBase
from membase.knowledge.document import Document

kb = ChromaKnowledgeBase(persist_directory="/tmp/kb", membase_account="default", auto_upload_to_hub=True)
kb.add_documents(Document(content="Your doc content.", metadata={"source": "docs"}))
```

### 4. Chain Tasks (On-Chain Coordination)

```python
from membase.chain.chain import membase_chain

membase_chain.createTask("task-1", price=100000)
membase_chain.register("alice")
membase_chain.joinTask("task-1", "alice")
membase_chain.finishTask("task-1", "alice")
```

### 5. Identity & Auth

```python
membase_chain.register("your_agent_name")
membase_chain.buy("agent_a", "agent_b")  # agent_b gets access to agent_a's resources
membase_chain.has_auth("agent_a", "agent_b")  # check permission
```

### Resources

* [Python SDK](https://github.com/unibaseio/membase) · [JS SDK](https://github.com/unibaseio/membase-js) · [MCP](https://github.com/unibaseio/membase-mcp)
* [Memory Hub](https://hub.membase.unibase.com)
