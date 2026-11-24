import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.unibase.com',
  // The old Membase pages moved to docs.membase.com. GitHub Pages cannot answer 301, so each
  // old URL is a page that sends the reader on at once (meta refresh + canonical) to the
  // matching new page, or to the new docs' front page where there is no match.
  redirects: {
    '/membase/quick-start': 'https://docs.membase.com/use/getting-started/quickstart/',
    '/membase/architecture': 'https://docs.membase.com/build/concepts/how-membase-works/',
    '/membase/memory': 'https://docs.membase.com/build/guides/memory-operations/',
    '/membase/sdk-reference': 'https://docs.membase.com/build/reference/sdk-quickstart/',
    '/membase/integration-options': 'https://docs.membase.com/build/',
    '/membase/authorization': 'https://docs.membase.com/build/reference/authentication/',
    '/membase/identity': 'https://docs.membase.com/use/getting-started/sign-in/',
    '/membase/cooperation': 'https://docs.membase.com/',
    '/membase/settlement': 'https://docs.membase.com/',
    '/membase/storage-backends': 'https://docs.membase.com/',
    '/membase': 'https://docs.membase.com/',
    '/get-started/membase-quickstart': 'https://docs.membase.com/use/getting-started/quickstart/',
  },
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
              "link": "https://docs.membase.com/use/getting-started/quickstart/"
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
              "label": "Membase Docs (docs.membase.com)",
              "link": "https://docs.membase.com/"
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
          "label": "Membase Extension",
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
