# Chess game

This example demonstrates a multi-agent system implementing an interactive chess game.&#x20;

**Prerequisites**

```shell
cd examples/aip_chess_game
```

**Setup and Running**

1. **Start Game Moderator**

```shell
export MEMBASE_ID="<moderator_id>"
export MEMBASE_ACCOUNT="<membase account>"
export MEMBASE_SECRET_KEY="<membase secret key>"
export MEMBASE_TASK_ID="<task id>"
uv run main.py
```

2. **Start Players** The game begins when both black and white players are connected.

```shell
export MEMBASE_ID="<player_uuid>"
export MEMBASE_ACCOUNT="<membase account>"
export MEMBASE_SECRET_KEY="<membase secret key>"
export MEMBASE_TASK_ID="<above_task_id>"
uv run role.py --moderator=<above_moderator_id> 
```

3. **Launch Web Interface** To view the chess board in your browser:

```shell
uv run app.py  # Access at http://localhost:5000
```
