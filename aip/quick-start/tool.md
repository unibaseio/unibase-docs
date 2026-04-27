# Tool

## Start Tool

The system supports two types of tool servers:

**1. gRPC Tool Server (Indirect Access)**

```shell
export MEMBASE_ID="<membase uuid>"
export MEMBASE_ACCOUNT="<membase account>"
export MEMBASE_SECRET_KEY="<membase secret key>"
cd examples/aip_tools
# Start the tool server for other agents to use
uv run grpc_mock_tool.py
```

**2. SSE Tool Server (Direct Access)**

```shell
export MEMBASE_ID="<membase uuid>"
export MEMBASE_ACCOUNT="<membase account>"
export MEMBASE_SECRET_KEY="<membase secret key>"
export MEMBASE_SSE_URL="<http://your_ip:your_port>"
cd examples/aip_tools
# Start the tool server with specified port
uv run sse_mock_tool.py --port=<your_port>
```

## Usage in LLM chat

### _**tool list**_

{% code overflow="wrap" %}
```
Query:
list tools

Response:
Here are some of the tools available:\n\n1. **config_hub-register_server**: Register a new agent/tool server to the configuration hub. It requires information such as the server name, description, and configuration details.\n\n2. **config_hub-search_server_config**: Search for agent/tool servers similar to a specified query. This tool is useful for finding relevant server configurations.\n\n3. **memory_hub-add_memory**: Add a memory to the memory hub. You need to provide a memory ID, the content, and optionally, metadata.\n\n4. **memory_hub-search_similar**: Search for memories similar to a specific query. It allows for refining searches with metadata and content filters.\n\nIf you need further details on how to use any of these tools, feel free to ask!
```
{% endcode %}

### _**tool discovery**_

search xxx in config\_hub

{% code overflow="wrap" %}
```
Query: 
search memory server confgiration in config_hub

Response: 
Here are server configurations related to memory in the `config_hub`:\n\n1. **Memory Hub**: \n   - **Description**: This is a membase memory hub, which can manage your memories, allowing you to add memories and search for similar memories.\n   - **Functions**: \n     - `add_memory`: Add a memory to the memory hub.\n     - `search_similar`: Search for memories similar to a query.\n\n
```
{% endcode %}

### _**tool connect**_

connect tools then use it as function call

<pre><code>Query:
<strong>connect memory_hub via url aip-grpc
</strong></code></pre>

