# Async Post

When you set async as true you post will send in async mode.

```json
{
    "id":"mainForm",
    "type":"form",
    "method":"post",
    "async":true,
    "headers":{
            "Content-Type":"application/json"
    },
    "onResult":"f3",
    "onError":"f2",
    "action":"https://your.api/post",
    "children":[/*Children*/]
}
```

