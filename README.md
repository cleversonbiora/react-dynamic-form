# react-json-page

This is a React lib to generate pages and forms based in json files.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

`index.js`

```
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducers } from 'react-json-page';
import { combineReducers } from 'redux';

export const ReducersApp = combineReducers({
    dynamicFormState: Reducers
    /*YOUR REDUCERS*/
});
export const Store = createStore(ReducersApp);

ReactDOM.render(
    <Provider store={Store}>
    <App />
    </Provider>, document.getElementById('root'));
```

`App.js`

```
//ADD IMPORT
import {DynamicPage} from 'react-json-page'

//ADD COMPONENT
<DynamicPage form={/*JSON Object*/} />;
```

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

Run the following command:

`npm install react-json-page`


## Built With

* [React](https://reactjs.org/) - The web library used
* [Redux](https://redux.js.org/) - State Management

## Contributing

Coming soon I wiil open for submitting pull requests to us.

## Authors

* **Cleverson Biora** - *Initial work* - [PurpleBooth](https://github.com/cleversonbiora)

See also the list of [contributors](https://github.com/cleversonbiora/react-json-page/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
