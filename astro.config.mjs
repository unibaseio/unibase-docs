import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.unibase.com',
  integrations: [
    starlight({
      title: 'Unibase Docs',
      // Same icons as unibase.com
      favicon: '/favicon.ico',
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-icon.png' } },
      ],
      sidebar: [
        {
          "label": "Overview",
          "items": [
            {
              "label": "Overview",
              "link": "/"
            },
            {
              "label": "Architecture",
              "slug": "overview/architecture"
            },
            {
              "label": "Core Concepts",
              "slug": "overview/core-concepts"
            },
            {
              "label": "Supported Networks",
              "slug": "overview/supported-networks"
            },
            {
              "label": "Status & Maturity",
              "slug": "overview/status"
            }
          ]
        },
        {
          "label": "Get Started",
          "items": [
            {
              "label": "Overview",
              "slug": "get-started"
            },
            {
              "label": "Prerequisites",
              "slug": "get-started/prerequisites"
            },
            {
              "label": "Membase Quick Start",
              "slug": "get-started/membase-quickstart"
            },
            {
              "label": "AIP Quick Start",
              "slug": "get-started/aip-quickstart"
            },
            {
              "label": "Unibase Pay Quick Start",
              "slug": "get-started/pay-quickstart"
            },
            {
              "label": "Unibase DA Quick Start",
              "slug": "get-started/da-quickstart"
            }
          ]
        },
        {
          "label": "Membase",
          "items": [
            {
              "label": "Overview",
              "slug": "membase"
            },
            {
              "label": "Quick Start",
              "slug": "membase/quick-start"
            },
            {
              "label": "Architecture",
              "slug": "membase/architecture"
            },
            {
              "label": "Wallet & Identity",
              "slug": "membase/identity"
            },
            {
              "label": "Domains & Encryption",
              "slug": "membase/authorization"
            },
            {
              "label": "Memory & Recall",
              "slug": "membase/memory"
            },
            {
              "label": "Storage Backends",
              "slug": "membase/storage-backends"
            },
            {
              "label": "Cooperation Protocol",
              "slug": "membase/cooperation"
            },
            {
              "label": "Settlement",
              "slug": "membase/settlement"
            },
            {
              "label": "Integration Options",
              "slug": "membase/integration-options"
            },
            {
              "label": "SDK Reference",
              "slug": "membase/sdk-reference"
            }
          ]
        },
        {
          "label": "AIP",
          "items": [
            {
              "label": "Overview",
              "slug": "aip"
            },
            {
              "label": "Quick Start",
              "slug": "aip/quick-start"
            },
            {
              "label": "Core Concepts",
              "slug": "aip/design"
            },
            {
              "label": "Architecture",
              "slug": "aip/implementation"
            },
            {
              "label": "Agent Interaction Process",
              "slug": "aip/agent-interaction-process"
            }
          ]
        },
        {
          "label": "Unibase Pay",
          "items": [
            {
              "label": "Overview",
              "slug": "unibase-pay"
            },
            {
              "label": "Quick Start",
              "slug": "unibase-pay/quick-start"
            },
            {
              "label": "Privy Wallet",
              "slug": "unibase-pay/privy-wallet"
            },
            {
              "label": "API Reference",
              "slug": "unibase-pay/api-reference"
            }
          ]
        },
        {
          "label": "Unibase DA",
          "items": [
            {
              "label": "Overview",
              "slug": "unibase-da"
            },
            {
              "label": "Architecture",
              "slug": "unibase-da/components"
            },
            {
              "label": "Verifiable Storage",
              "slug": "unibase-da/unibase-storage"
            },
            {
              "label": "Quick Start",
              "slug": "unibase-da/quick-start"
            },
            {
              "label": "Nodes Bootstrap",
              "items": [
                {
                  "label": "Overview",
                  "slug": "unibase-da/quick-start/nodes-bootstrap"
                },
                {
                  "label": "Storage Node",
                  "slug": "unibase-da/quick-start/nodes-bootstrap/storage-node"
                },
                {
                  "label": "Validator Node",
                  "slug": "unibase-da/quick-start/nodes-bootstrap/validator-node"
                },
                {
                  "label": "Stream Node",
                  "slug": "unibase-da/quick-start/nodes-bootstrap/stream-node"
                },
                {
                  "label": "Docker",
                  "slug": "unibase-da/quick-start/nodes-bootstrap/docker"
                }
              ]
            },
            {
              "label": "Nodes operations",
              "slug": "unibase-da/quick-start/nodes-operations"
            }
          ]
        },
        {
          "label": "Governance",
          "items": [
            {
              "label": "Overview",
              "slug": "governance"
            },
            {
              "label": "Staking & vUB",
              "slug": "governance/staking"
            },
            {
              "label": "Governance Process",
              "slug": "governance/process"
            },
            {
              "label": "Proposals & Execution",
              "slug": "governance/proposals"
            }
          ]
        },
        {
          "label": "Unibase Memory",
          "items": [
            {
              "label": "Overview",
              "slug": "unibase-memory"
            },
            {
              "label": "Getting Started",
              "slug": "unibase-memory/getting-started"
            },
            {
              "label": "Features",
              "slug": "unibase-memory/features"
            },
            {
              "label": "Architecture",
              "slug": "unibase-memory/architecture"
            },
            {
              "label": "FAQ",
              "slug": "unibase-memory/faq"
            }
          ]
        },
        {
          "label": "Reference",
          "items": [
            {
              "label": "Overview",
              "slug": "reference"
            },
            {
              "label": "SDK",
              "slug": "reference/sdk"
            },
            {
              "label": "Integrations",
              "slug": "reference/integrations"
            },
            {
              "label": "Hub",
              "slug": "reference/hub"
            },
            {
              "label": "API Reference",
              "slug": "reference/api-reference"
            },
            {
              "label": "Networks",
              "slug": "reference/networks"
            },
            {
              "label": "Glossary",
              "slug": "reference/glossary"
            },
            {
              "label": "Troubleshooting",
              "slug": "reference/troubleshooting"
            },
            {
              "label": "FAQ",
              "slug": "reference/faq"
            }
          ]
        },
        {
          "label": "Examples",
          "slug": "examples"
        },
        {
          "label": "Resources",
          "items": [
            {
              "label": "Overview",
              "slug": "resources"
            },
            {
              "label": "Community",
              "slug": "resources/community"
            },
            {
              "label": "Security & Best Practices",
              "slug": "resources/security"
            },
            {
              "label": "Whitepapers",
              "slug": "resources/whitepapers"
            }
          ]
        },
        {
          "label": "Unibase Whitepaper",
          "slug": "unibase-whitepaper-summary"
        },
        {
          "label": "AIP Whitepaper",
          "slug": "aip-whitepaper"
        },
        {
          "label": "AIP 2.0 - Agent Internet Protocol",
          "slug": "aip-2.0-agent-internet-protocol"
        }
      ],
    }),
  ],
});
