import { createReducer } from '.'
import { actions } from '../actions/trending'

const initialState = {
  items: [],
  nextPage: '/v1/trending',
}

const appendNewItems = (state, { items, nextPage }) => {
  return {
    ...state,
    items: state.items.concat(items),
    nextPage,
  }
}

const trendingReducer = createReducer(initialState, {
  [actions.APPEND_NEW_ITEMS]: appendNewItems,
})

export default trendingReducer