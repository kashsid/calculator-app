import React, { Component } from "react";
import { connect } from "react-redux";
import "./claculate.css";
import "./calc.css";

class App extends Component {
  //getting the calculations from database entries
  componentDidMount = () => {
    this.interval = setInterval(
      () => this.props.dispatch({ type: "GET_CALCULATION" }),
      1000
    );
  };
  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  //set state for the different inputs being used in the functionality
  state = {
    value: "",
    firstNum: "",
    secondNum: "",
    operator: ""
  };

  //when the all members of the state of filled, run the POST to send the data to the server
  //I did this because on the click of equals I can get the answer but the state isnt ready
  //in time send off a complete state to the db
  componentDidUpdate = () => {
    if (
      this.state.value !== "" &&
      this.state.firstNum !== "" &&
      this.state.secondNum !== "" &&
      this.state.operator !== ""
    ) {
      this.props.dispatch({ type: "ADD_CALCULATION", payload: this.state });
      this.clearFields();
    }
  };

  //empty all input fields on the click of clear
  empty = () => {
    this.setState({ value: "" });
    this.setState({ firstNum: "" });
    this.setState({ secondNum: "" });
    this.setState({ operator: "" });
  };

  //empty all input fields minus the answer
  clearFields = () => {
    this.setState({ firstNum: "" });
    this.setState({ secondNum: "" });
    this.setState({ operator: "" });
  };

  //on the click of a button set the state to the new value
  handleClick = number => event => {
    this.setState({
      value: this.state.value + event.target.value
    });
  };

  //limit the amount of decimals used in each state entry so that there cant be two or more
  handleDecimalChange = number => event => {
    if (this.state.value.indexOf(".") === -1) {
      this.setState({
        value: this.state.value + event.target.value
      });
    }
  };

  //set the state of the operator used to whatever value is clicked upon
  handleoperatorClick = number => event => {
    this.state.firstNum = this.state.value;
    this.setState({ value: "" });
    this.state.operator = event.target.value;
  };

  //limit the users ability to hit zero as the first number used
  //decimals first are alright
  handleZeroClick = number => event => {
    if (this.state.value !== "") {
      this.setState({
        value: this.state.value + event.target.value
      });
    }
  };

  //conditional to determine what operator was inputted and what function to run
  //send the value back as a number so things do not concatinate
  submitEquation = () => {
    this.state.secondNum = this.state.value;
    if (this.state.operator == "+") {
      this.setState({
        value: Number(this.state.firstNum) + Number(this.state.secondNum)
      });
    } else if (this.state.operator == "-") {
      this.setState({
        value: Number(this.state.firstNum) - Number(this.state.secondNum)
      });
    } else if (this.state.operator == "/") {
      this.setState({
        value: (
          Number(this.state.firstNum) / Number(this.state.secondNum)
        ).toFixed(5)
      });
    } else if (this.state.operator == "*") {
      this.setState({
        value: Number(this.state.firstNum) * Number(this.state.secondNum)
      });
    }
  };

  render() {
    return (
      <div>
        <div className="calculator">
          <div className="row-value">
                    <div>{this.state.firstNum} {this.state.operator} {this.state.secondNum} </div>
          </div>
           <div className="row-value">
            <div>{this.state.value}</div>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="7"
            >
              7
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="8"
            >
              8
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="9"
            >
              9
            </button>
            <button
              className="btn btn--orange "
              onClick={this.handleoperatorClick("operator")}
              value="/"
            >
              /
            </button>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="4"
            >
              4
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="5"
            >
              5
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="6"
            >
              6
            </button>
            <button
              className="btn btn--orange"
              onClick={this.handleoperatorClick("operator")}
              value="*"
            >
              *
            </button>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="1"
            >
              1
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="2"
            >
              2
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleClick("value")}
              value="3"
            >
              3
            </button>
            <button
              className="btn btn--orange"
              onClick={this.handleoperatorClick("operator")}
              value="+"
            >
              +
            </button>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleDecimalChange("value")}
              value="."
            >
              .
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleZeroClick("value")}
              value="0"
            >
              0
            </button>
            <button
              id="eqn-bg"
              className="btn btn--orange"
              onClick={this.submitEquation}
            >
              =
            </button>
            <button
              className="btn btn--orange "
              onClick={this.handleoperatorClick("operator")}
              value="-"
            >
              -
            </button>
          </div>
          <div className="row">
            <button className="btn num-bg num " onClick={this.empty}>
              Clear
            </button>
          </div>
        </div>
        <div>
          <div className="exp-history">
            <h3>Calculation History</h3>
          </div>
          {this.props.reduxState.calculatorReducer.map(calc => (
            <div className="history">
              <li>
                {calc.firstNum} {calc.operator} {calc.secondNum} = {calc.value}
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
