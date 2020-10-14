import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import runtime from 'regenerator-runtime'   // support async/await

import App from './components/App'
import createStore from './state/store'

const store = createStore()

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app-root')
)