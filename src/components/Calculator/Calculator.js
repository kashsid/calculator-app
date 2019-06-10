import React, { Component } from 'react';
import { connect } from 'react-redux';
import './claculate.css';
import './calc.css';


class App extends Component {

    //getting the calculations from database entries
    componentDidMount = () => {
        this.interval = setInterval(() => this.props.dispatch({ type: 'GET_CALCULATION' }), 1000);
       
    }
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    //set state for the different inputs being used in the functionality
    state = {
        value: "",
        firstNum: "",
        secondNum: "",
        operator: "",
    }

    //when the all members of the state of filled, run the POST to send the data to the server
    //I did this because on the click of equals I can get the answer but the state isnt ready
    //in time send off a complete state to the db
    componentDidUpdate = () => {
        // console.log('componentDidUpdate - state read', this.state);
        if (this.state.value !== "" &&
            this.state.firstNum !== "" &&
            this.state.secondNum !== "" &&
            this.state.operator !== "") {
            // console.log('DID THIS WORK????', this.state);
            this.props.dispatch({ type: 'ADD_CALCULATION', payload: this.state })
            this.clearFields();
        }
    }

    //empty all input fields on the click of clear
    empty = () => {
        this.setState({ value: "" })
        this.setState({ firstNum: "" })
        this.setState({ secondNum: "" })
        this.setState({ operator: "" })
    }

    //empty all input fields minus the answer so that the previous answer can be used in future equations
    clearFields = () => {
        // this.setState({ value: "" })
        this.setState({ firstNum: "" })
        this.setState({ secondNum: "" })
        this.setState({ operator: "" })
    }

    //on the click of a button set the state to the new value
    handleChange = number => event => {
        this.setState({
            value: this.state.value + event.target.value,
        })
    }

    //limit the amoiunt of decimals used in each state entry so that there cant be two or more
    handleDecimalChange = number => event => {
        if (this.state.value.indexOf(".") === -1) {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    //set the state of the operator used to whatever value is clicked upon
    handleoperatorChange = number => event => {
        this.state.firstNum = this.state.value
        //this.setState({ value: "" })
        this.state.operator = event.target.value
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

    //conditional to determine what operator was inputted and what function to run
    //send the value back as a number so things do not concatinate
    submitEquation = () => {
        this.state.secondNum = this.state.value
        if (this.state.operator == "+") {
            this.setState({
                value: Number(this.state.firstNum) + Number(this.state.secondNum)
            })
        } else if (this.state.operator == "-") {
            this.setState({
                value: Number(this.state.firstNum) - Number(this.state.secondNum)
            })
        } else if (this.state.operator == "/") {
            this.setState({
                value: Number(this.state.firstNum) / Number(this.state.secondNum)
            })
        } else if (this.state.operator == "*") {
            this.setState({
                value: Number(this.state.firstNum) * Number(this.state.secondNum)
            })
        }
        
    }

    //minor test to see when the dispatch is ready
    // logState = () => {
    //     console.log('CLICK EQUALS STATE', this.state);
    // }

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
                        <button className="btn btn--orange " onClick={this.handleoperatorChange('operator')} value="/">/</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="4">4</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="5">5</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="6">6</button>
                        <button className="btn btn--orange" onClick={this.handleoperatorChange('operator')} value="*">*</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="1">1</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="2">2</button>
                        <button className="btn num-bg num " onClick={this.handleChange('value')} value="3">3</button>
                        <button className="btn btn--orange" onClick={this.handleoperatorChange('operator')} value="+">+</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.handleDecimalChange('value')} value=".">.</button>
                        <button className="btn num-bg num " onClick={this.handleZeroChange('value')} value="0">0</button>
                        <button id="eqn-bg" className="btn btn--orange" onClick={this.submitEquation}>=</button>
                        <button className="btn btn--orange " onClick={this.handleoperatorChange('operator')} value="-">-</button>
                    </div>
                    <div className="row">
                        <button className="btn num-bg num " onClick={this.empty}>Clear</button>
                    </div>
                </div>
                <div>
                   
                    <div className="exp-history">
                        Expressions History
   </div>
                    {this.props.reduxState.calculatorReducer.map((calc) =>
                        <div className="history">
                            <li>{calc.firstNum}   {calc.operator}   {calc.secondNum}   =   {calc.value}</li>
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
