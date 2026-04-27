# Multi Memory

### Core Feature

* Supports conversation switching
* Supports conversation upload when auto_upload_to_hub is set; view at https://hub.membase.unibase.com/
* Supports conversation preload from storage hub: https://hub.membase.unibase.com/

```python
from membase.memory.multi_memory import MultiMemory
from membase.memory.message import Message

mm = MultiMemory(
    membase_account="default",
    auto_upload_to_hub=True,
    preload_from_hub=True,  # preload all conversations for membase_account
)
msg = Message(
    name = "agent9527",
    content = "Hello! How can I help you?",
    role="assistant",
    metadata="help info"
)

# switch to
conversation_id='your_conversation'
mm.add(msg, conversation_id)
```
