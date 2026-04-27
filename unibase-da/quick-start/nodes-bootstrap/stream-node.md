# Stream Node

### Network Requirements

High network requirements, requires an external IP address.

### Run

Set environment before your operation:

```
export CHAIN_TYPE=<your CHAIN_TYPE>
```

Initialize, using the \~/.stream directory by default

```shell
./stream-edge init
```

Using port 8083 by default, port 8083 needs to be accessible from the external network

```shell
./stream-edge daemon run -e EXPOSE_URL
```

For example, if the external IP is 1.2.3.4

```bash
./stream-edge daemon run -b 0.0.0.0:8083 -e http://1.2.3.4:8083
```
