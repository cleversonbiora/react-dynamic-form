# Dynamic Forms

See the form example below.

```json
{
        "id":"mainForm",
        "type":"form",
        "className":"form",
        "children":[{  
                "id":"firstName",
                "name":"firstName",
                "type":"text",
                "className": "form-control",
                "value":"John",
                "validation":{
                    "output":"firstNameError",
                    "validators":[{
                        "type":"required",
                        "msg":"Required."
                    }]
                }
            },
            {
                "id":"firstNameErrorSpan",
                "type":"span",
                "value":"{firstNameError}"
            },
            {
                "type":"br"
            },
            {  
                "id":"lastName",
                "name":"lastName",
                "type":"text",
                "value":"Chosen",
                "validation":{
                    "output":"lastNameError",
                    "validators":[{
                        "type":"required",
                        "msg":"Campo obrigatório."
                    }]
                }
            },
            {
                "id":"lastNameErrorSpan",
                "type":"span",
                "value":"{lastNameError}"
            },
            {  
                "id":"btnSubmit",
                "type":"submit",
                "value":"Send",
                "className": "btn btn-default"
            }]
}
```

