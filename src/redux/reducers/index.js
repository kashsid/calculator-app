import { combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';
const rootReducer = combineReducers({
    //reducer name here
    calculatorReducer,
});

export default rootReducer;
