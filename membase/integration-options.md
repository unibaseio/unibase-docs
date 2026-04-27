# Integration Options

Membase can be integrated in three ways:

### 1. SDK (Python / JavaScript)

**Best for:** Custom agents, full control over memory and identity.

**Python:**
```bash
pip install git+https://github.com/unibaseio/membase.git
```

**JavaScript:**
```bash
npm install @unibase/membase-js  # or see github.com/unibaseio/membase-js
```

See [Quick Start](quick-start/README.md) for usage.

### 2. MCP (Model Context Protocol)

**Best for:** MCP-compatible clients (Claude Desktop, Cline, etc.).

**Membase MCP Server:** [github.com/unibaseio/membase-mcp](https://github.com/unibaseio/membase-mcp)

Add the Membase MCP server to your client config. Your agent can then read and write memory through the MCP protocol without direct SDK integration.

### 3. Skill

**Best for:** Frameworks like BitAgent that support skill packs.

Use Membase as a skill to enable memory for agents in the BitAgent ecosystem. No code changes required — install the skill and configure.

### Comparison

| Option | Use case | Setup effort |
|--------|----------|--------------|
| SDK | Custom agents, full control | Medium |
| MCP | Existing MCP clients | Low |
| Skill | BitAgent / skill-based frameworks | Low |
