# Docker

docker startup will automatically init and run&#x20;

### storage node

```docker
services:
  dimo-store:
    image: mossv2/dimo:store-latest
    ports:
      - 8080:8080
    volumes:
      - /home/ubuntu/data/hub:/data
      - /home/ubuntu/.plonk:/root/.plonk
    restart: on-failure:0
    environment:
      CHAIN_TYPE: ""  # opbnb-testnet or op-sepolia
      MAX_SIZE: "100GB" # max storage 
networks:
  default:
    driver: bridge
```

### stream

```docker
services:
  dimo-stream:
    image: mossv2/dimo:stream-latest
    ports:
      - 8080:8080
    volumes:
      - /home/ubuntu/data/stream:/data
      - /home/ubuntu/.plonk:/root/.plonk
    restart: on-failure:0
    environment:
      CHAIN_TYPE: ""  # opbnb-testnet or op-sepolia
      EXPOSE_URL: ""  # required
networks:
  default:
    driver: bridge
```

### validator

```docker
services:
  dimo-validator:
    image: mossv2/dimo:validator-latest
    ports:
      - 8080:8080
    volumes:
      - /home/ubuntu/data/validator:/data
      - /home/ubuntu/.plonk:/root/.plonk
    restart: on-failure:0
    environment:
      CHAIN_TYPE: ""  # opbnb-testnet or op-sepolia
networks:
  default:
    driver: bridge
```

### hub

```docker
services:
  dimo-hub:
    image: mossv2/dimo:hub-latest
    ports:
      - 8080:8080
    volumes:
      - /home/ubuntu/data/hub:/data
    restart: on-failure:0
    environment:
      CHAIN_TYPE: "" # opbnb-testnet or op-sepolia
      EXPOSE_URL: "" # required
      MAX_SIZE: "4MB" # file max size 
networks:
  default:
    driver: bridge
```
