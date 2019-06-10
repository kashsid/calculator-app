import React, { Component } from 'react'

export class Calculator extends Component {
    state = {
        value: "",
        firstNum: "",
        secondNum: "",
        operator: "",
    }

    componentDidUpdate = () => {
        console.log('state', this.state);

    }

    empty = () => {
        this.setState({ value: "" })
        this.setState({ firstNum: "" })
        this.setState({ secondNum: "" })
        this.setState({ operator: "" })
    }

    handleChange = number => event => {
        this.setState({
            value: this.state.value + event.target.value,
        })
    }

    handleDecimalChange = number => event => {
        if (this.state.value.indexOf(".") === -1) {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    handleOperatorChange = number => event => {
        this.state.firstNum = this.state.value
        this.setState({ value: "" })
        this.state.operator = event.target.value
    }

    handleZeroChange = number => event => {
        if (this.state.value !== "") {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }
    handleEquation = number => event => {
        if (this.state.value !== "") {
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    submitEqualSign = () => {
        this.state.secondNum = this.state.value
        if (this.state.symbol === "+") {
            this.setState({
                value: Number(this.state.firstNum) + Number(this.state.secondNum)
            })
        } else if (this.state.symbol === "-") {
            this.setState({
                value: Number(this.state.firstNum) - Number(this.state.secondNum)
            })
        } else if (this.state.symbol === "/") {
            this.setState({
                value: Number(this.state.firstNum) / Number(this.state.secondNum)
            })
        } else if (this.state.symbol === "*") {
            this.setState({
                value: Number(this.state.firstNum) * Number(this.state.secondNum)
            })
        }
        console.log('CLICK EQUALS STATE', this.state);
    }


    render() {
        return (
            <div className="Calculator">
               
                <div>
                    <div>
                        <div>{this.state.input}</div>
                    </div>
                    <div>
                        <button onClick={this.handleChange('value')} value="7">7</button>
                        <button onClick={this.handleChange('value')} value="8">8</button>
                        <button onClick={this.handleChange('value')} value="9">9</button>
                        <button onClick={this.handleOperatorChange('operator')} value="/">/</button>
                    </div>
                    <div>
                        <button onClick={this.handleChange('value')} value="4">4</button>
                        <button onClick={this.handleChange('value')} value="5">5</button>
                        <button onClick={this.handleChange('value')} value="6">6</button>
                        <button onClick={this.handleOperatorChange('operator')} value="*">*</button>
                    </div>
                    <div>
                        <button onClick={this.handleChange('value')} value="1">1</button>
                        <button onClick={this.handleChange('value')} value="2">2</button>
                        <button onClick={this.handleChange('value')} value="3">3</button>
                        <button onClick={this.handleOperatorChange('operator')} value="+">+</button>
                    </div>
                    <div>
                        <button nClick={this.handleDecimalChange('value')} value="3">.</button>
                        <button onClick={this.handleZeroChange('value')} value="0">0</button>
                        <button onClick={this.submitEquation}>=</button>
                        <button onClick={this.handleOperatorChange('operator')} value="-">-</button>
                    </div>
                    <div>
                        <button onClick={this.empty}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator
