import React, { Component } from 'react';
import '../index.css'
import * as API from './API'
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001/calculate'
  
class Calculator extends Component {
  
  state = {
   
   displayValue : 0,
   operator : null,
   waiting : false,
   oldnum : null

  }
  //fetch method



calculate(operator){
 
   console.log("inside calculator method");
  const displayValue = this.state.displayValue ;
  const oldnum = this.state.oldnum ;
  var str ;
   switch(this.state.operator){
     
    case '+' :
        console.log("sending post method with add");
        console.log(this.state);
         str = api+'/add' ;
        console.log(API)

        break;

    case '-':
        
        console.log("sending post method with add");
       
         str =api+'/sub'
        console.log(API)
        console.log("inside calculate with subtract");
        break ;

    case '*':
        
        console.log("sending post method with add");
       
         str =api+'/multiply'
        console.log(API)
        console.log("inside calculate with subtract");
        break ;    

    case '/':
        
        console.log("sending post method with add");
       
         str =api+'/divide'
        console.log(API)
        console.log("inside calculate with subtract");
        break ;
   
 
 }     //switch case getting over
 
 


API.solve(this.state , str)
            .then((res) => {
               console.log(res.variable);
              
                     console.log(res.variable);
                    this.setState({
                        displayValue:res.variable
                    });


                    if(operator!== '='){

                        this.setState({operator : operator,
                        oldnum :displayValue,
                      waiting : true})
 
                      }

                    else{
                        this.setState({operator : null ,
                        oldnum : null,
                        waiting :false})
                        }

                   
                
            });


 
}

 

  //function to input digit

  inputDigit(digit){

   const displayValue = this.state.displayValue ;
   const waiting = this.state.waiting;
   //const str = "1+2+3*2";
   //console.log(parseInt("123+2+3"));
   if(!waiting){
 
   if (displayValue === 0){
    this.setState( {
     displayValue : String(digit)
     } )
  }
   else{
    this.setState( {
      displayValue : displayValue+digit})
    }
   }
 
   else{
    console.log("inside second value")
    this.setState({
      displayValue : String(digit),
      waiting : false 
    })
   console.log("previous number")
   console.log(this.state)

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
  displayValue : 0,
  waiting : false,
  oldnum : 0,
  operator : null
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

const {displayValue} = this.state.displayValue ;
const num = parseFloat(displayValue);

this.setState({displayValue : String(num/100)})
}

//perform operation 


performOperation(operator){
const oldnum = this.state.oldnum ;
if(operator==='=' && this.state.waiting){
  console.log("Eror , this is not allowed")
}

else if (!this.state.waiting && oldnum !== null){
  //console.log("Eror , this is not allowed")
  {
    this.calculate(operator)};
}
else{  
this.setState({
  operator : operator ,
  waiting : true,
  oldnum : this.state.displayValue
})
}


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
            <button className="calculator-key key-divide" onClick={()=> this.performOperation('/')} >/</button>
            <button className="calculator-key key-multiply" onClick={()=> this.performOperation('*')} >×</button>
            <button className="calculator-key key-subtract"  onClick={()=> this.performOperation('-')} >−</button>
            <button className="calculator-key key-add"  onClick={()=> this.performOperation('+')} >+</button>
            <button className="calculator-key key-equals" onClick={()=> this.performOperation('=')} >=</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator ;