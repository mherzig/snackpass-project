export const actions = {
  GET_MORE_ITEMS: 'GET_MORE_ITEMS',
  APPEND_NEW_ITEMS: 'APPEND_NEW_ITEMS',
}

export function getMoreItems () {
  return {
    type: actions.GET_MORE_ITEMS,
  }
}

export function appendNewItems ({ items, nextPage }) {
  return {
    items,
    nextPage,
    type: actions.APPEND_NEW_ITEMS,
  }
}