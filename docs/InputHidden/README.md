# Inject External Components and Functions

You can hidden components based on value from another component.

```json
{
    "id":"hiddenContent",
    "type":"p",
    "value":"Show only if selectType equals 3.",
    "hidden":{
        "args":["selected","value"],
        "params":["{selectType}", "3"],
        "body":"return selected == value"
    }
}
```