# Async Load

You can populate your combo from de API.

```json
{  
    "id":"selectType",
    "name":"selectType",
    "type":"select",
    "value":"",
    "options":[  
        {  
        "value":"",
        "label":"Selecione"
        }
    ],
    "load":{  
            "apiUrl":"https://yoour.api/types",
            "method":"POST",
            "body":"{\"id\":3}",
            "headers":{
                    "Content-Type":"application/json"
            },
            "valueField":"id",
            "labelField":"nome",
            "root":"data",
            "override":false
    }
}
```

## options

Sync load of your select.

## load

Provide parameters to load async your select.

### root

Define the root object on json result.

### override

You can choose if options are replaced or not.
