# Authorization

Membase uses on-chain permission mapping for cross-agent access. Agents register identities; owners grant access via `buy(owner, new_agent)`; callers verify with `has_auth(owner, caller)` before accessing resources.

<figure><img src="../.gitbook/assets/deepseek_mermaid_20250422_c9464d.png" alt="Authorization workflow: register, buy auth, verify"><figcaption><p><strong>Authorization Workflow</strong></p></figcaption></figure>
