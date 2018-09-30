redux-dynamic-middlewares
===============

Allow add or remove redux middlewares dynamically (for example: on route change).

```
npm install --save redux-dynamic-middlewares
```

## Example

```js

// configure store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import getDynamicMiddlewareManager from 'redux-dynamic-middlewares'

const dynamicMiddlewareManager = getDynamicMiddlewares();
const store = createStore(
  rootReducer,
  applyMiddleware(
    // ... other static middlewares
    dynamicMiddlewareManager.dynamicMiddlewares
  )
)

// some other place in your code
const myMiddleware = store => next => action => {
  // do something
  return next(action)
}

// will add middleware to existing chain
dynamicMiddlewareManager.addMiddleware(myMiddleware /*[, anotherMiddleware ... ]*/)

// will remove middleware from chain (only which was added by `addMiddleware`)
dynamicMiddlewareManager.removeMiddleware(myMiddleware)

// clean all dynamic middlewares
dynamicMiddlewareManager.resetMiddlewares()

```
