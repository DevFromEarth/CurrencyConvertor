import "./Currency.css";
import {useEffect,useState} from "react";
 
export default function Currency({setCurrencyCode,inputValue,setinputValue,supportedCodes, onClick}) {

  return (
    <div className="currency">
      
      <select name="currencySelector" id="currencySelector" onChange={ e =>setCurrencyCode(e.target.value)}>
        {supportedCodes.map(value =>  <option value={value[0]}  key={value[0]}>{value[0]} - {value[1]}</option>)}       
      </select>      
      
      <input type="number" value={inputValue} onChange={e => setinputValue(e.target.value)} onClick={onClick}></input>
    </div>
  )
}