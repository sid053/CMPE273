import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css'


class Calculator extends React.Component {
  
  state = {
   
   displayValue : 0,
   operator : null,
   waiting : false,
   oldnum : 0

  }

  //function to input digit

  inputDigit(digit){

   const displayValue = this.state.displayValue ;
   const waiting = this.state.waiting;

   if(!waiting){
    //console.log("inside first value")
   if (displayValue === 0){
 
    this.setState( {
     displayValue : String(digit)
     } )
  }
   else{
    this.setState( {
      displayValue : displayValue+digit})
    }
   //console.log(displayValue);
   }
 
   else{
    console.log("inside second value")
    this.setState({
      displayValue : String(digit),
      waiting : false 
    })
   console.log("previous number")
   console.log(this.state.oldnum)

   }

}



//function for inputing dot
   
inputDot(){

const displayValue = this.state.displayValue ;

if(displayValue.indexOf('.')=== -1){
  this.setState({
displayValue : displayValue + '.'
})
}

}

//function for clear display

clearDisplay(){
  console.log("inside clear display");
this.setState({
  displayValue : 0
})

 }

//function for sign

changeSign(){
const displayValue = this.state.displayValue ;
if(displayValue.charAt(0)=== '-'){
  this.setState({
displayValue : displayValue.substr(1) 
})
}

else{
  this.setState({
    displayValue : '-' + displayValue
  })
}
}


//percentage function

calcPercentage(){

const {displayValue} = this.state ;
const num = parseFloat(displayValue);

this.setState({displayValue : String(num/100)})



}

performOperation(operator){

this.setState({
  operator : operator ,
  waiting : true,
  oldnum : this.state.displayValue
})



}


  render() {

    const {displayValue} = this.state ;
    return (
      <div className="calculator">
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={() => this.clearDisplay()} >AC</button>
              <button className="calculator-key key-sign" onClick={() => this.changeSign()}>±</button>
              <button className="calculator-key key-percent"  onClick={() => this.calcPercentage()} >%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
              <button className="calculator-key key-dot" onClick={() => this.inputDot()}>●</button>
              <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
              <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
              <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
              <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
              <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
              <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
              <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
              <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
              <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide" onClick={()=> this.performOperation('/')}>/</button>
            <button className="calculator-key key-multiply" onClick={()=> this.performOperation('*')} >×</button>
            <button className="calculator-key key-subtract"  onClick={()=> this.performOperation('-')}>−</button>
            <button className="calculator-key key-add"  onClick={()=> this.performOperation('+')}>+</button>
            <button className="calculator-key key-equals" onClick={()=> this.performOperation('=')}>=</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator ;