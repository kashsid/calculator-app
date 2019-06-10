import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//POST
function* addCalc(action) {
  try {
    // console.log('POST calculations', action);
    yield axios.post(`/api/calc/`, action.payload);
    yield put({ type: "GET_CALCULATION" });
  } catch (error) {
    console.log(`Couldn't POST the calculations`, error);
    alert(`Sorry couldn't add the new calculations. Try again later.`);
  }
}

//GET
function* getCalc() {
  // console.log('GET ten most recent calculations');
  try {
    const getResponse = yield axios.get(`/api/calc/`);
    const action = { type: "SET_CALCULATION", payload: getResponse.data };
    yield put(action);
  } catch (error) {
    console.log(`Couldn't get the calculations`, error);
    alert(`Sorry couldn't get the recent calculations. Try again later.`);
  }
}

function* calculationSaga() {
  yield takeLatest(`ADD_CALCULATION`, addCalc);
  yield takeLatest(`GET_CALCULATION`, getCalc);
}

export default calculationSaga;
