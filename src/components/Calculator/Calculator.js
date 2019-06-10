import React, { Component } from 'react';
import { connect } from 'react-redux';
import './claculate.css';
import './calc.css';


class App extends Component {

    //as of right now this is my quick fix to constantly be getting all database entries
    componentDidMount = () => {
        this.interval = setInterval(() => this.props.dispatch({ type: 'GET_CALC' }), 1000);
        // this.props.dispatch({ type: 'GET_CALC' });
    }

    //continuation of getting db entries and limiting data
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    // componentDidMount = () => {
    //   this.props.dispatch({ type: 'GET_CALC' });
    // }

    //set state for the different inputs being used in the functionality
    state = {
        value: "",
        firstNumber: "",
        secondNumber: "",
        symbol: "",
    }

    //when the all members of the state of filled, run the POST to send the data to the server
    //I did this because on the click of equals I can get the answer but the state isnt ready
    //in time send off a complete state to the db
    componentDidUpdate = () => {
        // console.log('componentDidUpdate - state read', this.state);
        if (this.state.value !== "" &&
            this.state.firstNumber !== "" &&
            this.state.secondNumber !== "" &&
            this.state.symbol !== "") {
            // console.log('DID THIS WORK????', this.state);
            this.props.dispatch({ type: 'ADD_CALC', payload: this.state })
            this.clearFields();
        }
    }

    //empty all input fields on the click of clear
    empty = () => {
        this.setState({ value: "" })
        this.setState({ firstNumber: "" })
        this.setState({ secondNumber: "" })
        this.setState({ symbol: "" })
    }

    //empty all input fields minus the answer so that the previous answer can be used in future equations
    clearFields = () => {
        // this.setState({ value: "" })
        this.setState({ firstNumber: "" })
        this.setState({ secondNumber: "" })
        this.setState({ symbol: "" })
    }

    //on the click of a button set the state to the new value
    handleChange = number => event => {
        this.setState({
            value: this.state.value + event.target.value,
        })
    }

    //limit the amoiunt of decimals used in each state entry so that there cant be two or more
    handleDecimalChange = number => event => {
        if (this.state.value.indexOf(".") == -1) {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    //set the state of the symbol used to whatever value is clicked upon
    handleSymbolChange = number => event => {
        this.state.firstNumber = this.state.value
        this.setState({ value: "" })
        this.state.symbol = event.target.value
    }

    //limit the users ability to hit zero as the first number used
    //decimals first are alright
    handleZeroChange = number => event => {
        if (this.state.value !== "") {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    //conditional to determine what symbol was inputted and what function to run
    //send the value back as a number so things do not concatinate
    submitEquation = () => {
        this.state.secondNumber = this.state.value
        if (this.state.symbol == "+") {
            this.setState({
                value: Number(this.state.firstNumber) + Number(this.state.secondNumber)
            })
        } else if (this.state.symbol == "-") {
            this.setState({
                value: Number(this.state.firstNumber) - Number(this.state.secondNumber)
            })
        } else if (this.state.symbol == "/") {
            this.setState({
                value: Number(this.state.firstNumber) / Number(this.state.secondNumber)
            })
        } else if (this.state.symbol == "*") {
            this.setState({
                value: Number(this.state.firstNumber) * Number(this.state.secondNumber)
            })
        }
        // this.logState();
        // this.empty();
        // console.log('CLICK EQUALS STATE', this.state);
    }

    //minor test to see when the dispatch is ready
    logState = () => {
        console.log('CLICK EQUALS STATE', this.state);
    }

    render() {
        return (
            <div>
                <div className="calculator">
                    <div className="row-value">
                        <div>{this.state.value}</div>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="7">7</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="8">8</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="9">9</button>
                        <button className="btn btn--orange " onClick={this.handleSymbolChange('symbol')} value="/">/</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="4">4</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="5">5</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="6">6</button>
                        <button className="btn btn--orange" onClick={this.handleSymbolChange('symbol')} value="*">*</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="1">1</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="2">2</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="3">3</button>
                        <button className="btn btn--orange" onClick={this.handleSymbolChange('symbol')} value="+">+</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleDecimalChange('value')} value=".">.</button>
                        <button className="btn num-bg num " onClick={this.handleZeroChange('value')} value="0">0</button>
                        <button id="eqn-bg" className="btn btn--orange" onClick={this.submitEquation}>=</button>
                        <button className="btn btn--orange " onClick={this.handleSymbolChange('symbol')} value="-">-</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.empty}>Clear</button>
                    </div>
                </div>
                <div>
                    {/* map over the reducer that holds the ten most recent calculations */}
                    <div className="history-header">
                        Entry History  (Ten Most Recent)
   </div>
                    {this.props.reduxState.calculationsReducer.map((calc) =>
                        <div className="history">
                            <li>{calc.firstNumber}   {calc.symbol}   {calc.secondNumber}   =   {calc.value}</li>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(App);
