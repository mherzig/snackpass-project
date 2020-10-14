import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import appReducer from './reducers'
import appSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware = []) => {
  if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const configureStore = (initialState) => {
  const store = createStore(
    appReducer,
    initialState,
    bindMiddleware([ sagaMiddleware ])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(appSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore