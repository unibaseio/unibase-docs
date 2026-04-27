# Validator Node

#### Requirements

### Run

Set environment before your operation:

```
export CHAIN_TYPE=<your CHAIN_TYPE>
```

Initialize, using the \~/.store directory by default

```shell
export CHAIN_TYPE=<your chain>
./validator init
```

Using port 8085 by default

```shell
./validator daemon run
```

For example

```shell
./validator daemon run -b 0.0.0.0:8085
```
