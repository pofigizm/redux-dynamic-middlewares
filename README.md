redux-dynamic-middlewares
===============

Allow add or remove redux middlewares dynamically (for example: on route change).

```
npm install --save redux-dynamic-middlewares
```

## Example

common usage:
```js

// configure store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import dynamicMiddlewares from 'redux-dynamic-middlewares'

const store = createStore(
  rootReducer,
  applyMiddleware(
    // ... other static middlewares
    dynamicMiddlewares
  )
)

// some other place in your code

import { addMiddleware, removeMiddleware, resetMiddlewares } from 'redux-dynamic-middlewares'

const myMiddleware = store => next => action => {
  // do something
  return next(action)
}

// will add middleware to existing chain
addMiddleware(myMiddleware /*[, anotherMiddleware ... ]*/)

// will remove middleware from chain (only which was added by `addMiddleware`)
removeMiddleware(myMiddleware)

// clean all dynamic middlewares
resetMiddlewares()

```

complex usage (when need many instances):
```js

// configure store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import { createDynamicMiddlewares } from 'redux-dynamic-middlewares'

const dynamicMiddlewaresInstance = createDynamicMiddlewares()

const store = createStore(
  rootReducer,
  applyMiddleware(
    // ... other static middlewares
    dynamicMiddlewaresInstance.enhancer
  )
)

// some other place in your code

const myMiddleware = store => next => action => {
  // do something
  return next(action)
}

// will add middleware to existing chain
dynamicMiddlewaresInstance.addMiddleware(myMiddleware /*[, anotherMiddleware ... ]*/)

// will remove middleware from chain (only which was added by `addMiddleware`)
dynamicMiddlewaresInstance.removeMiddleware(myMiddleware)

// clean all dynamic middlewares
dynamicMiddlewaresInstance.resetMiddlewares()

```
