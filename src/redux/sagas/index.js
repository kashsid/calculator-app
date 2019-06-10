import { all } from 'redux-saga/effects';
import calculatorSaga from './calculatorSaga';

export default function* rootSaga() {
    yield all([
        calculatorSaga(),
    ]);
}
