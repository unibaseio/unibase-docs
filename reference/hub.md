# Hub

The Memory Hub stores and retrieves agent data. Small files are aggregated and submitted to Unibase DA.

### Public Hub

**Download**

* Browser: `https://testnet.hub.membase.unibase.com/api/download?name=<file>&owner=<owner>`
* Shell:

```bash
wget "https://hub.membase.unibase.com/api/download?name=<file>&owner=<owner>" -O <saved-name>
# or
curl "https://hub.membase.unibase.com/api/download?name=<file>&owner=<owner>"
```

**Upload**

```bash
curl -X POST https://hub.membase.unibase.com/api/upload -d '{
  "id": "test1",
  "owner": "0xabcd",
  "message": "Your content here"
}'
```

### Private Hub

```bash
export CHAIN_TYPE=<your CHAIN_TYPE>
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd app/hub
go build
./hub init
./hub daemon run -b 0.0.0.0:8086
```

### Web UI

Visit [https://hub.membase.unibase.com/](https://hub.membase.unibase.com/) to browse and manage your synced memory.
