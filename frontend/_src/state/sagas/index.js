import { call, all, take, takeLeading, put, select } from 'redux-saga/effects'
import axios from 'axios'

import {
  actions as trendingActions,
  appendNewItems
} from '../actions/trending'

// we are running everything locally here and we also want the option to use a phone or
// other device as well. Normally we would have a FQDN if this is a real API backend
// but here we have to cheat a bit.
const ORIGIN = location.origin

function * getNewItems () {
  try {
    const nextPagePath = yield select(state => state.trending.nextPage)
    const url = ORIGIN + ':3000' + nextPagePath

    const resp = yield call(axios.get, [ url ])

    yield put(appendNewItems(resp.data))
  } catch (err) {    
    // didn't implement, but would handle informing users if there was an error
    // yield put(informError(err))
    console.error(err)
  }
}

export default function * rootSaga () {
  yield all([
    takeLeading(trendingActions.GET_MORE_ITEMS, getNewItems),
  ])
}