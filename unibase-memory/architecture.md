# Architecture

Unibase Memory is more than a local chat organizer. It is built on Unibase's decentralized AI memory infrastructure, so memory is **local-first by default** and, when synced, **encrypted, owned, and verifiable**.

### The pipeline

```
Capture in the browser  →  Encrypt locally  →  Sync to Membase (optional)
```

Unlike typical browser extensions that store your data in a vendor-controlled database, Unibase Memory keeps cleartext on your device and only ever uploads ciphertext.

### Encrypt

Memory content is encrypted **locally, on your device, before any sync**.

* Encryption uses **Fernet (AES-128-CBC + HMAC-SHA256)** with a **wallet-derived key** — the key is derived on-device from your wallet signature and never leaves the browser.
* Unibase stores only the resulting ciphertext. Your cleartext and your key stay under your control.

{% hint style="info" %}
End-to-end encrypted means even after sync, your conversation content is readable only by you. Unibase, the Hub, and Unibase Explorer only ever see encrypted blobs.
{% endhint %}

### Own

Your memories become a cross-AI archive you keep — not a feature locked inside one chatbot vendor.

* Reuse memory across supported AI platforms.
* Export everything as a JSON backup.
* Restore your synced archive by signing in again with the same account on any device.

### Verify

Once synced, memories are connected to Unibase's verifiable memory infrastructure and can be inspected on **Unibase Explorer** — which shows the verifiable record (ownership, sync status) as public proof the memory exists and belongs to your account, while the content itself stays encrypted.

### The Unibase memory stack

| Layer | Role for Unibase Memory |
|-------|-------------------------|
| **[Membase](../membase/README.md)** | The memory layer that stores and manages synced AI memory |
| **[Unibase DA](../unibase-da/README.md)** | Verifiable data availability for scalable, durable memory |
| **Unibase decentralized storage** | Keeps memory persistent beyond one browser or device |
| **Privy** | Sign-in & wallet (email / X / MetaMask) — source of the encryption key |

### Privacy posture

* **Local-first** — nothing leaves the device unless you enable sync.
* **On-device AI** — semantic search and tagging run locally; conversation content is never sent to a server to be processed.
* **Minimal telemetry** — only anonymous, content-free usage events; never your conversations, titles, tags, email, or wallet address.

---

Next: [Features](features.md) · [FAQ](faq.md)
