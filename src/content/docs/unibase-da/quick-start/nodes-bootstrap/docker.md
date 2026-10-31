---
title: "Docker"
---

Each DA node role has its own image in [`unibase/da`](https://hub.docker.com/r/unibase/da) on Docker Hub (linux/amd64):

| Role | Image | Port |
|------|-------|------|
| Storage | `unibase/da:store-latest` | 8082 |
| Stream | `unibase/da:stream-latest` | 8083 |
| Validator | `unibase/da:validator-latest` | 8085 |
| Hub | `unibase/da:hub-latest` | 8080 |

Pinned versions are tagged `<role>-<version>`, e.g. `unibase/da:store-0.1.38`. The images run on the base-sepolia testnet and talk to the [testnet gateway](/unibase-da/quick-start/nodes-bootstrap/#gateway-server) by default.

### First start

On its first start a container creates the node repo and wallet under `/data` and prints the wallet address:

```
unibase/da store: wallet 0x… (fund it with base-sepolia ETH and UB to register), gateway https://testnet.gateway.unibase.com
```

Send that address base-sepolia ETH for gas, and UB for the stake (a storage node stakes at least 50,000 UB). The node registers and stakes when it starts; until the wallet is funded it exits, and a `restart: unless-stopped` policy keeps retrying.

Keep `/data` and the password: the wallet key is stored in `/data/keystore`, encrypted with `NODE_PASSWORD`.

### Environment

| Variable | Default | |
|----------|---------|---|
| `NODE_PASSWORD` | — | **Required.** Encrypts the node wallet; needed on every start. |
| `EXPOSE_URL` | `http://127.0.0.1:<port>` | The URL other nodes and clients reach this node at, e.g. `http://203.0.113.10:8082`. Storage and stream nodes must be reachable. |
| `SERVER_URL` | `https://testnet.gateway.unibase.com` | The gateway. |
| `CHAIN_TYPE` | `base-sepolia` | |
| `CHAIN_RPC_84532` | a public endpoint | RPC for transactions and calls; your own provider is more reliable. |
| `CHAIN_RPC_FILTER_84532` | `https://sepolia.base.org` | RPC for event sync; it must serve `eth_getLogs` over ranges of 128 blocks. |
| `MAX_SIZE` | `1TB` | Storage only: how much the node stores. |

Volumes: `/data` (repo and wallet) and `/root/.plonk` (proving parameters, several GB, downloaded on the first start).

### Hardware

A storage or stream node loads about 4 GB of proving parameters, so give it at least 16 GB of memory. Answering a challenge, a storage node builds a large recursive proof that needs about 64 GB of memory; a storage node that cannot answer in time is penalized.

### Storage node

```yaml
services:
  store:
    image: unibase/da:store-latest
    ports:
      - 8082:8082
    volumes:
      - ./data/store:/data
      - ./plonk:/root/.plonk
    restart: unless-stopped
    environment:
      NODE_PASSWORD: "change-me"
      EXPOSE_URL: "http://<your-public-ip>:8082"
      MAX_SIZE: "100GB"
```

### Stream node

```yaml
services:
  stream:
    image: unibase/da:stream-latest
    ports:
      - 8083:8083
    volumes:
      - ./data/stream:/data
      - ./plonk:/root/.plonk
    restart: unless-stopped
    environment:
      NODE_PASSWORD: "change-me"
      EXPOSE_URL: "http://<your-public-ip>:8083"
```

### Validator node

```yaml
services:
  validator:
    image: unibase/da:validator-latest
    ports:
      - 8085:8085
    volumes:
      - ./data/validator:/data
      - ./plonk:/root/.plonk
    restart: unless-stopped
    environment:
      NODE_PASSWORD: "change-me"
      EXPOSE_URL: "http://<your-public-ip>:8085"
```

### Hub

```yaml
services:
  hub:
    image: unibase/da:hub-latest
    ports:
      - 8080:8080
    volumes:
      - ./data/hub:/data
      - ./plonk:/root/.plonk
    restart: unless-stopped
    environment:
      NODE_PASSWORD: "change-me"
      EXPOSE_URL: "http://<your-public-ip>:8080"
```
