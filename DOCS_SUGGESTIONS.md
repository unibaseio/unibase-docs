# Unibase Docs — Full Review Suggestions

> Based on complete read-through of all documentation.

---

## 1. Fixes (Recommended)

### 1.1 reference/sdk.md — Unibase DA path

**Current:** `go run upload.go --path=./file --sk=<secret_key>` (from project root)

**Issue:** unibase-da-sdk has `example/upload/`; upload binary is built there.

**Fix:** Align with unibase-da/quick-start:
```bash
cd example/upload
go build
./upload --path=./file --sk=<secret_key>
```

### 1.2 unibase-pay/privy-wallet.md — Broken link

**Current:** `[Unibase Pay API](../unibase-pay/api-reference.md)`

**Issue:** From `unibase-pay/privy-wallet.md`, `../unibase-pay/` goes to root then unibase-pay — wrong.

**Fix:** `[API Reference](api-reference.md)` (same folder)

### 1.3 reference/hub.md — Hub URLs ✅ Resolved

All Hub URLs updated to `hub.membase.unibase.com` (mainnet) and `testnet.hub.membase.unibase.com` (testnet).

### 1.4 membase/quick-start/multi-memory.md — Typos

* "support conversation switch" → "Supports conversation switching"
* "can be visit" → "can be visited"
* "switch to  " → "switch to" (trailing space)
* "preload_from_hub = True" → "preload_from_hub=True" (spacing)

### 1.5 resources/community.md — Missing Unibase Pay

**Report Issues** lists Membase, AIP, Unibase DA. Add Unibase Pay if there is a dedicated issues repo.

---

## 2. Content Improvements

### 2.1 examples.md — Remove redundant table

**Current:** Two tables — "By Scenario" (with links) + "Module" table with "Last Update" column.

**Suggestion:** Remove the second table. "Last Update" dates (e.g. "2 weeks ago") become stale and add maintenance burden. The "By Scenario" table with direct GitHub links is sufficient.

### 2.2 membase/authorization.md — Add content

**Current:** Only an image (authorization workflow). No explanatory text.

**Suggestion:** Add 2–3 sentences describing the flow (register → buy auth → verify), or merge into identity.md.

### 2.3 overview/architecture.md — Image alt text

**Current:** `<figcaption></figcaption>` empty; alt="" on image.

**Suggestion:** Add alt text for accessibility: e.g. "Unibase layered architecture diagram"

### 2.4 Swagger API URL

**Current:** `http://54.251.11.180:8080/swagger/index.html`

**Suggestion:** Replace with stable domain when available. Add note: "Internal/dev — URL may change."

---

## 3. Structure Suggestions

### 3.1 Whitepapers in SUMMARY

**Current:** Unibase Whitepaper, AIP Whitepaper, AIP 2.0 at root level of nav.

**Suggestion:** Consider moving under Resources (resources/whitepapers.md already links to them). Keeps nav flatter. Optional.

### 3.2 reference/hub.md — Private Hub path

**Current:** `cd app/hub` — verify this path exists in unibase-da-sdk. GitHub structure showed `app/` folder.

**Action:** Confirm `app/hub` vs `hub/` in actual repo.

---

## 4. Consistency

### 4.1 BNB Chain vs BSC

Used interchangeably. BNB Chain = ecosystem; BSC = smart chain. Both valid. Consider standardizing: "BNB Chain" for narrative, "BSC" for technical (e.g. "BSC mainnet").

### 4.2 get-started/README vs README.md

get-started has "Choose Your Path" at top — good. Main README has it at section 3 after intro — good. Both are appropriate for their context.

---

## 5. Optional Enhancements

### 5.1 Add "Copy" buttons

GitBook supports code block copy. Ensure code blocks are properly fenced for copy-to-clipboard.

### 5.2 Version badges

If SDKs have released versions, consider adding version badges (e.g. `v1.2.3`) to README or reference/sdk.

### 5.3 Changelog

DOCS_OPTIMIZATION suggests optional changelog. Add `resources/changelog.md` when ready to track doc/SDK updates.

### 5.4 Search keywords

Ensure key terms (Membase, AIP, x402, MCP, Unibase Pay, Unibase DA) appear in titles and early paragraphs for GitBook search.

---

## 6. Verified OK

* SUMMARY.md — All links valid
* overview/core-concepts.md — Clear, aligned with modules
* overview/supported-networks.md — Accurate
* get-started/* — Concise, correct paths
* reference/faq.md — Good coverage
* reference/troubleshooting.md — Practical
* reference/integrations.md — Useful
* resources/security.md — Solid
* Module READMEs — Streamlined, developer-friendly

---

## Priority Summary

| Priority | Item |
|----------|------|
| High | reference/sdk.md DA path |
| High | privy-wallet.md link |
| Medium | examples.md remove redundant table |
| Medium | multi-memory.md typos |
| Medium | hub.md URL consistency |
| Low | authorization.md content |
| Low | architecture.md alt text |
| Low | Swagger domain (when available) |
