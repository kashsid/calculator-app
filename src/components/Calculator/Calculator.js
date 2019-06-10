import React, { Component } from "react";
import "./claculate.css";
import "./calc.css";

export class Calculator extends Component {
  state = {
    value: "",
    firstNum: "",
    secondNum: "",
    operator: ""
  };

  componentDidUpdate = () => {
    console.log("state", this.state);
  };

  empty = () => {
    this.setState({ value: "" });
    this.setState({ firstNum: "" });
    this.setState({ secondNum: "" });
    this.setState({ operator: "" });
  };

  handleChange = number => event => {
    this.setState({
      value: this.state.value + event.target.value
    });
  };

  handleDecimalChange = number => event => {
    if (this.state.value.indexOf(".") === -1) {
      this.setState({
        value: this.state.value + event.target.value
      });
    }
  };

  handleOperatorChange = number => event => {
    this.state.firstNum = this.state.value;
    this.setState({ value: "" });
    this.state.operator = event.target.value;
  };

  handleZeroChange = number => event => {
    if (this.state.value !== "") {
      this.setState({
        value: this.state.value + event.target.value
      });
    }
  };
  handleEquation = number => event => {
    if (this.state.value !== "") {
      this.setState({
        value: this.state.value + event.target.value
      });
    }
  };

  submitEqualSign = () => {
    this.state.secondNum = this.state.value;
    if (this.state.symbol === "+") {
      this.setState({
        value: Number(this.state.firstNum) + Number(this.state.secondNum)
      });
    } else if (this.state.symbol === "-") {
      this.setState({
        value: Number(this.state.firstNum) - Number(this.state.secondNum)
      });
    } else if (this.state.symbol === "/") {
      this.setState({
        value: Number(this.state.firstNum) / Number(this.state.secondNum)
      });
    } else if (this.state.symbol === "*") {
      this.setState({
        value: Number(this.state.firstNum) * Number(this.state.secondNum)
      });
    }
    console.log("CLICK EQUALS STATE", this.state);
  };

  render() {
    return (
      <div>
        <div className="calculator">
          <div className="row-value">
            <div>{this.state.value}</div>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="7"
            >
              7
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="8"
            >
              8
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="9"
            >
              9
            </button>
            <button
              className="btn btn--orange "
              onClick={this.handleSymbolChange("symbol")}
              value="/"
            >
              /
            </button>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="4"
            >
              4
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="5"
            >
              5
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="6"
            >
              6
            </button>
            <button
              className="btn btn--orange"
              onClick={this.handleSymbolChange("symbol")}
              value="*"
            >
              *
            </button>
          </div>
          <div className="row">
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="1"
            >
              1
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="2"
            >
              2
            </button>
            <button
              className="btn num-bg num "
              onClick={this.handleChange("value")}
              value="3"
            >
              3
            </button>
            <button
              className="btn btn--orange"
              onClick={this.handleSymbolChange("symbol")}
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
              onClick={this.handleZeroChange("value")}
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
              onClick={this.handleSymbolChange("symbol")}
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
          {/* map over the reducer that holds the ten most recent calculations */}
          <div className="history-header">Entry History (Ten Most Recent)</div>
          {this.props.reduxState.calculationsReducer.map(calc => (
            <div className="history">
              <li>
                {calc.firstNumber} {calc.symbol} {calc.secondNumber} ={" "}
                {calc.value}
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
