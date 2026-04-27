# Unibase Docs Architecture

> Community developer documentation refactor — path: Quick Start → Deep Dive → Reference

---

## 1. Design Principles

### 1.1 Developer-First
* **Code-first**: Each module homepage has copy-paste-ready runnable code within 30 seconds
* **Clear paths**: Organize by "What I want to do" rather than "What we have"
* **Progressive**: 5 min quick start → 15 min run-through → deep dive as needed

### 1.2 Consistent
* Unified module structure: Overview → Quick Start → Guides → Reference
* Unified terminology: Membase / AIP / Unibase Pay / Unibase DA
* Unified code block style: bash / python / env vars

### 1.3 Discoverable
* Homepage "Choose Your Path" navigation
* Clear "Next Steps" links in each module
* Centralized Examples and Reference

---

## 2. Target Users & Paths

| User Type | Primary Need | Entry |
|-----------|--------------|-------|
| Agent Developer | Build AI agents with memory and collaboration | AIP + Membase |
| Memory Integrator | Add persistent memory to existing agents | Membase (SDK/MCP/Skill) |
| Payment Integrator | Enable agent autonomous payments | Unibase Pay |
| Node Operator | Run DA storage/validator nodes | Unibase DA |
| Researcher | Understand protocol and architecture | Whitepapers + Architecture |

---

## 3. Module Structure

```
Unibase Docs
│
├── 📖 1. Overview
│   ├── README.md                    # Home: What is Unibase + Choose Path
│   ├── architecture.md              # Architecture diagram and layers
│   ├── core-concepts.md              # Identity, Memory, x402
│   └── supported-networks.md         # Supported networks
│
├── 🚀 2. Get Started (5 min)
│   ├── README.md                    # Overview + Prerequisites
│   ├── membase-quickstart.md        # Membase fastest path
│   ├── aip-quickstart.md            # AIP fastest path
│   ├── pay-quickstart.md            # Unibase Pay fastest path
│   └── da-quickstart.md             # Unibase DA fastest path
│
├── 📚 3. Membase
│   ├── README.md                    # Overview + one-line install + 30s example
│   ├── quick-start.md               # Full Quick Start (with env)
│   ├── integration-options.md       # SDK / MCP / Skill
│   ├── guides/
│   │   ├── multi-memory.md          # Multi-session memory
│   │   ├── knowledge-base.md        # Knowledge base
│   │   ├── chain-tasks.md           # On-chain tasks
│   │   └── identity-auth.md         # Identity and authorization
│   ├── architecture.md
│   └── api-reference.md             # Optional, or link to reference
│
├── 📚 4. AIP
│   ├── README.md                    # Overview + one-line install + 30s example
│   ├── quick-start.md               # Full Quick Start
│   ├── guides/
│   │   ├── agent-tool-grpc.md
│   │   ├── agent-tool-sse.md
│   │   ├── agent-agent.md
│   │   └── chess-game.md
│   ├── design.md
│   ├── implementation.md
│   └── tool.md
│
├── 📚 5. Unibase Pay
│   ├── README.md                    # Overview + API URL + 30s call
│   ├── quick-start.md               # Env, first verify/settle
│   ├── privy-wallet.md              # Privy custodial wallet + MCP/Skill
│   └── api-reference.md
│
├── 📚 6. Unibase DA
│   ├── README.md                    # Overview + one-line upload example
│   ├── quick-start.md               # Go SDK full flow
│   ├── node-operations/
│   │   ├── README.md                # Node types overview
│   │   ├── storage-node.md
│   │   ├── validator-node.md
│   │   └── stream-node.md
│   ├── docker.md
│   └── architecture.md             # Merge with components.md
│
├── 📚 7. Reference
│   ├── README.md                    # SDK / Hub / API overview
│   ├── sdk.md                       # SDK links and versions
│   ├── hub.md                       # Memory Hub usage
│   ├── api-reference.md             # Unified API entry
│   └── networks.md                  # Networks, RPC, Explorer
│
├── 📚 8. Examples
│   ├── README.md                    # Example table + By Scenario
│   └── by-module.md                 # By module
│
├── 📚 9. Resources
│   ├── community.md                 # Telegram, Discord, Email
│   ├── whitepapers.md               # Whitepaper index
│   └── changelog.md                 # Optional
│
└── 📄 Root
    ├── unibase-whitepaper-summary.md
    ├── aip-whitepaper.md
    └── aip-2.0-agent-internet-protocol.md
```

---

## 4. SUMMARY.md Navigation (GitBook Sidebar)

See current SUMMARY.md for the live structure.

---

## 5. Module README Template

Each core module README should include:

```markdown
# [Module Name]

> One-line positioning

## 30-Second Quick Start

[One-line install/configure]

[Minimal runnable example 5–10 lines]

## Key Features

* Feature 1
* Feature 2

## Next Steps

* [Full Quick Start](quick-start.md)
* [Integration Options / Guides](...)
* [API Reference](...)

## Resources

* GitHub | Docs | Community
```

---

## 6. Migration & Cleanup

### Keep and Integrate
| Current | Migrate To |
|---------|------------|
| introduction/* | overview/* |
| introduction/quick-start.md | Merge into get-started/* |
| membase/* | membase/ (reorganize guides) |
| aip/* | aip/ (reorganize guides) |
| unibase-da/* | unibase-da/ (nodes-boostrap → node-operations) |
| developers/* | reference/* |
| examples.md | examples/README.md |

### Remove or Archive
| Current | Action |
|---------|--------|
| basics/* | GitBook template, remove |
| getting-started/quickstart.md, publish-your-docs.md | Template files, remove |
| alpha-testing/* | Archive or remove if outdated |

### Rename
| Current | New Name |
|---------|----------|
| nodes-boostrap | node-operations (fix typo) |
| developers | reference |

---

## 7. Implementation Order

1. **Phase 1: Structure Reorganization**
   * Create overview/, get-started/, reference/, resources/
   * Migrate introduction → overview
   * Write 5-min Quick Start for each module

2. **Phase 2: Module Optimization**
   * Membase: Integrate guides, add integration-options
   * AIP: Integrate guides structure
   * Unibase Pay: Add quick-start, privy-wallet
   * Unibase DA: nodes-boostrap → node-operations

3. **Phase 3: Reference & Examples**
   * Integrate developers → reference
   * Improve Examples table and classification

4. **Phase 4: Cleanup**
   * Remove basics, redundant getting-started
   * Handle alpha-testing
   * Final SUMMARY.md update

---

## 8. Content Mapping

| New Path | Source |
|----------|--------|
| overview/architecture.md | introduction/architecture.md |
| overview/core-concepts.md | introduction/core-components.md (condensed) |
| get-started/membase-quickstart.md | New, extract from membase/quick-start |
| membase/guides/multi-memory.md | membase/quick-start/multi-memory.md |
| membase/guides/knowledge-base.md | membase/README Knowledge Base section |
| membase/guides/chain-tasks.md | membase/README Chain Task section |
| membase/guides/identity-auth.md | membase/identity.md + authorization.md |
| unibase-da/node-operations/* | unibase-da/quick-start/nodes-boostrap/* |
| reference/* | developers/* |

---

*Architecture design complete. Ready for phased implementation.*
