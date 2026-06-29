# Integration Options

Membase integrates three ways. Pick by how much control you want.

### 1. SDK (Python)

**Best for:** custom agents, full control over memory, domains, and identity.

```bash
# Minimal — cooperation protocol + plugins + Hub access
pip install "unibase-membase-sdk @ git+https://github.com/unibaseio/unibase-membase.git"

# With LLM recall (memory.ingest / memory.answer) + MCP adapter
pip install "unibase-membase-sdk[mcp,recovery,runtime] @ git+https://github.com/unibaseio/unibase-membase.git"
```

`uv pip install ...` works too. See the [Quick Start](quick-start/README.md) for usage. To run your own Server (managed persistence + settlement), clone the repo and install `./server` — see the [repo README](https://github.com/unibaseio/unibase-membase).

### 2. MCP (Model Context Protocol)

**Best for:** Claude Desktop, Cline, and other MCP clients — no code.

Download the prebuilt **`unibase-membase.mcpb`** bundle from the [releases page](https://github.com/unibaseio/unibase-membase/releases) and double-click to install in Claude Desktop. The install dialog has optional fields:

* **Agent Private Key** — blank to auto-generate; the key stays on your machine.
* **OpenAI API Key** — needed for `memory_ingest` / `memory_answer`; blank for raw KV tools only.
* **Cooperation Domain** / **Channel Relay URL** — optional, for multi-agent sessions.
* **Membase Server URL** — optional, only for `metering_*` / on-chain settlement.

After install, the `memory_*` and `session_*` tools appear in any conversation.

### 3. Skill

**Best for:** frameworks like BitAgent that support skill packs.

Install Membase as a skill to give agents memory with no code changes — install and configure.

### Comparison

| Option | Use case | Setup effort |
|--------|----------|--------------|
| **SDK** | Custom agents, full control | Medium |
| **MCP** | Existing MCP clients (Claude Desktop…) | Low |
| **Skill** | BitAgent / skill-based frameworks | Low |
