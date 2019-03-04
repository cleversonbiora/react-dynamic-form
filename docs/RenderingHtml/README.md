# Redering HTML from JSON

See the example below.

```json
{  
            "type":"div",
            "id":"mainGroup",
            "type":"div",
            "className":"row",
            /* Any other valid HTML attribute */
            "children":[{  
                "id":"title",
                "type":"h1",
                "value":"Page",
                "className": "title"
            },
            {
                "type":"p",
                "style":{"color":"red"},
                "value":"Hello, {firstName}"
            },
            {  
                "id":"firstName",
                "name":"firstName",
                "type":"text",
                "className": "form-control",
                "value":"Cleverson"
            }]
}
```

## type

The type accept any HTML tag and [Injected Components](/react-json-page/InjectedComponents).

## id

The is required only for [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components){:target="_blank"}

# attributes

The JSON accept any HTML attribute and Class and anothers attributes with composed name follow the same rules as React.

# value

Values support mustaches tags referencing input's ID and Validation's output.

# children

Provides a array of nested components.


