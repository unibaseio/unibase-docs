# Integration Options

> **Which Membase do you want?** Two different things carry the name.
>
> * **The product** — one hosted memory your AI tools and agents share: containers, documents,
>   search, MCP. It is published and installable today:
>   `pip install unibaseio-membase` · `npm install @unibaseio/membase` ·
>   `npm install -g @unibaseio/membase-cli`. Reference: [SDK](../reference/sdk.md) and
>   [docs.membase.ai](https://docs.membase.ai).
> * **The protocol SDK** — wallet identity, client-side encrypted domains, the cooperation
>   protocol and on-chain settlement. **That is what this section of the docs describes.** Its
>   source (`unibaseio/membase-protocol`) is private and it is not published to PyPI, so the
>   options below are available to the Unibase team and design partners, not to the public.
>
> The two do not share an API. `Wallet`, `create_domain` and the `unibase_membase` import name
> exist only in the protocol SDK; `containers` / `documents` / `memories` only in the product.

Membase integrates three ways. Pick by how much control you want.

### 1. SDK (Python)

**Best for:** custom agents, full control over memory, domains, and identity.

The protocol SDK is distributed from its private repository, so there is no public install
command. With access:

```bash
pip install "unibase-membase-sdk @ git+https://github.com/unibaseio/membase-protocol.git"
pip install "unibase-membase-sdk[mcp,recovery,runtime] @ git+https://github.com/unibaseio/membase-protocol.git"
```

`uv pip install ...` works too. See the [Quick Start](quick-start/README.md) for usage. To run
your own Server (managed persistence + settlement), clone the repo and install `./server`.

**Without access**, install the published product instead — `pip install unibaseio-membase` —
and read [docs.membase.ai](https://docs.membase.ai); the code in this section will not run
against it.

### 2. MCP (Model Context Protocol)

**Best for:** Claude Desktop, Cline, and other MCP clients — no code.

For the published product, MCP needs no bundle: point a client at the hosted endpoint, or run
`membase --local mcp` from `@unibaseio/membase-cli`. See
[Connect your AI](https://docs.membase.ai/connect/).

For the protocol SDK, download the prebuilt **`unibase-membase.mcpb`** bundle from the private
repository's releases page and double-click to install in Claude Desktop. The install dialog has
optional fields:

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
