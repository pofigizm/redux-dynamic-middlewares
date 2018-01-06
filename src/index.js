import { compose } from 'redux'

let allDynamicMiddlewares = []

const dynamicMiddlewares = ({ getState, dispatch }) => next => action => {
  const middlewareAPI = {
    getState,
    dispatch: act => dispatch(act),
  }

  const chain = allDynamicMiddlewares.map(middleware => middleware(middlewareAPI))

  return compose(...chain)(next)(action)
}

const addMiddleware = (...middlewares) => {
  allDynamicMiddlewares = [...allDynamicMiddlewares, ...middlewares];
}

const removeMiddleware = middleware => {
  const index = allDynamicMiddlewares.findIndex(d => d === middleware)

  if (index === -1) {
    console.error('Middleware does not exist!', middleware)

    return;
  }

  allDynamicMiddlewares = allDynamicMiddlewares.filter((middleware, mdwIndex) => mdwIndex !== index);
}

const resetMiddlewares = () => {
  allDynamicMiddlewares = []
}

export default dynamicMiddlewares
export {
  addMiddleware,
  removeMiddleware,
  resetMiddlewares,
}
