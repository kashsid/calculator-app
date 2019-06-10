const calculatorReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CALCULATION':
            return action.payload;
        default:
            return state;
    }
}

export default calculatorReducer;