import { combineReducers } from 'redux'

import trendingReducer from './trending'

export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const appReducer = combineReducers({
  trending: trendingReducer
})

export default appReducer