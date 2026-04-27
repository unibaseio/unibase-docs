# Nodes operations

Set environment before your operation:

```
export CHAIN_TYPE=<your CHAIN_TYPE>
```

### Stream Node

Check balance

```bash
./stream chain balance 
```

Check revenue

```bash
./stream chain stream revenue
```

Withdraw revenue

```bash
./stream chain stream withdraw
```

### Storage Node

Check balance

```bash
export CHAIN_TYPE=<your chain>
./stream chain balance
```

Check revenue information

```bash
./store-edge chain store revenue
```

Withdraw storage revenue, updates available rewards

```bash
./store-edge chain store withdraw
```

Update storage rewards

```bash
./store-edge chain store updateReward
```

Withdraw storage rewards

```bash
./store-edge chain store withdrawReward
```

### Validator Node

Check Balance

```bash
./validator chain balance
```
