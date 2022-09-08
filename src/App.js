import { useReducer } from "react";
import "./App.css";
import ACTION from "./Action";
import DigitButton from "./Digit";
import OperationButton from "./Operation";



function reducer (state, {type, payload}){
switch (type) {

  // values of button
  case ACTION.ADD_DIGIT :
    if(state.overWrite){
      return{
        ...state,
        currentOperand : payload.digit,
        overWrite : false
      }
    }
// checking wheather current operand value is zero and previousopearnd is value is zero

    if(payload.digit === "0" && state.currentOperand ==="0") {return state}

    // checking wheather if there is already single "." dot then second "." dot is not allowed
    if(payload.digit === "." && state.currentOperand.includes(".")) {return state}
    
  return{
    ...state,
     currentOperand:`${state.currentOperand || ""}${payload.digit}`,
  } 


// opeartion
  case ACTION.CHOOSE_OPERATION:

// checking wheather current operand and previousopearnd is null
    if (state.currentOperand === null && state.previousOperand === null) {
      return state
    }

    if(state.currentOperand === null){
      return{
        ...state,
        operation:payload.operation
      }
    }

    if(state.previousOperand == null){
      return{
        ...state,
        operation : payload.operation,
        previousOperand: state.currentOperand,
        currentOperand : null,
      }
    }


    return {
      ...state,
      previousOperand: evaluate(state),
      operation: payload.operation,
      currentOperand : null

     }
    


 // all clear
    case ACTION.CLEAR: return{
      state : {}
    }


// EQUAL TO 
    case ACTION.EVALUATE :
      if(state.operation == null || 
      state.currentOperand == null || 
      state.previousOperand == null
      ){
        console.log("hello")
      return state;
    }

    return{
      ...state,
      overWrite : true,
      previousOperand : null,
      operation : null,
      currentOperand : evaluate(state)
    }


  // delete all
  case  ACTION.DELETE_DIGIT : 
  if(state.overWrite){
    return{
      ...state,
      overWrite : false,
      currentOperand : null
    }
  }

  if(state.currentOperand == null) return state
  if(state.currentOperand.lenght == 1){
    return{
      ...state,
      currentOperand:null
    }
  }

  return{
    ...state,
    currentOperand : state.currentOperand.slice(0, -1)
  }
     
  default:
    break;
}

}

// evaluate function
const evaluate = ({currentOperand, previousOperand, operation}) => {
   const prev = parseFloat(previousOperand)
   const current = parseFloat(currentOperand)
   if(isNaN(prev) || isNaN(current)){
    return ""
   }
   let computation = ""
   switch (operation) {
    // for plus operation
    case "+":
      computation = prev + current
      break;

 // for minus operation
      case "-":
          computation = prev - current
          break;

 // for multiple operation
      case "*":
            computation = prev * current
            break;

 // for divide operation
      case "÷":
              computation = prev / current
              break;
      default:
         break
   }
   return computation.toString();
  
}

const App = () => {

  const  [{currentOperand, previousOperand, operation}, dispatch ] = useReducer(reducer, {})

  return (

    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
        <button className="spantwo" onClick={() => 
          dispatch({type:ACTION.CLEAR})
        }>AC</button>
        <button onClick={() => 
          dispatch({type:ACTION.DELETE_DIGIT})
        }>DEl</button>
        <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
        <DigitButton digit="1" dispatch={dispatch}></DigitButton>
        <DigitButton digit="2" dispatch={dispatch}></DigitButton>
        <DigitButton digit="3" dispatch={dispatch}></DigitButton>
        <OperationButton operation="*" dispatch={dispatch}></OperationButton>
        <DigitButton digit="4" dispatch={dispatch}></DigitButton>
        <DigitButton digit="5" dispatch={dispatch}></DigitButton>
        <DigitButton digit="6" dispatch={dispatch}></DigitButton>
        <OperationButton operation="+" dispatch={dispatch}></OperationButton>
        <DigitButton digit="7" dispatch={dispatch}></DigitButton>
        <DigitButton digit="8" dispatch={dispatch}></DigitButton>
        <DigitButton digit="9" dispatch={dispatch}></DigitButton>
        <OperationButton operation="-" dispatch={dispatch}></OperationButton>
        <DigitButton digit="0" dispatch={dispatch}></DigitButton>
        <DigitButton digit="." dispatch={dispatch}></DigitButton>
        <button className="spantwo" onClick={() => {
          dispatch({type:ACTION.EVALUATE})}
        }>=</button>
      </div>
  
  );
}

export default App;
