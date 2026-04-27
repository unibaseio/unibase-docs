# Storage Node

### Run

Set environment before your operation:

```
export CHAIN_TYPE=<your CHAIN_TYPE>
```

Initialize, using the \~/.store directory by default

```shell
./store-edge init
```

Using port 8082 by default

```shell
./store-edge daemon run -e EXPOSE_URL
```

For example, if the external IP is 1.2.3.4, port 8082 can be accessed from the external network

```shell
./store-edge daemon run -b 0.0.0.0:8082 -e http://1.2.3.4:8082
```

For example, if the external IP is 1.2.3.4, port 8082 cannot be accessed from the external network

```shell
./store-edge daemon run -b 0.0.0.0:8082
```
