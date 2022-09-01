import  ACTION  from "./Action";
// import "./App.css"
export default function OpeartionButton({dispatch, operation}) {
    return<button onClick={() => 
        dispatch({type : ACTION.CHOOSE_OPERATION, payload: {operation}})
    }>{operation}</button>
    
}