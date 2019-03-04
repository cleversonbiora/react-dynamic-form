# Inject External Components and Functions

You can inject on library your own custom components and function and call from JSON.

## Custom Components

Inject the component.

```jsx
const Components = {
    YourComponent
};

return (
    <DynamicPage form={formJson} customComponents={Components}/>
);
```
And use on Json.

```json
{  
    "id":"teste",
    "type":"YourComponent"
}
```

## Custom Functions

Inject the functions.

```jsx
var funcs = {
    f1: function(value) { console.log('Call F1');},
    f2: function() {console.log('Call F2');},
    f3: function(value) {console.log(value);}
};

return (
    <DynamicPage form={formJson} functions={funcs} />
);
```
And use on your input or form.

```json
{  
    "id":"lastName",
    "name":"lastName",
    "type":"text",
    "onBlur":"f1",
    "onFocus":"f2"
}
{  
    "id":"formOne",
    "type":"form",
    "onResult":"f3",
    "onError":"f2"
    /*...*/
}
```