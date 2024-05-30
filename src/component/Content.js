import Currency from "./Currency";
import "./Content.css";
import {useEffect,useState} from "react";

export default function Content() {
  const [conversion_rate,setConversion_rate] = useState(1);
  const [supportedCodes, setsupportedCodesg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [firstSelect, setfirstSelect] = useState('AED');
  const [secondSelect, setsecondSelect] = useState('AED');

  const [firstInput, setfirstInput] = useState(1);
  const [secondInput, setsecondInput] = useState(3);

  const [clickedChild, setClickedChild] = useState("1");
  const handleChildClick = (childId) => {
      setClickedChild(childId);
  };


  useEffect(  () => {
    async function getConversionRate() { 
      let first, second;
      if (clickedChild === "1")
      {
        first = firstSelect;
        second = secondSelect;
      }
      else{
        first =  secondSelect;
        second = firstSelect;
      }
  
      const response = await fetch(`https://v6.exchangerate-api.com/v6/a164929e4a3e57c0a67b0ce0/pair/${first}/${second}`);
      const data = await response.json();
      setConversion_rate(data.conversion_rate);
      updateConversion(clickedChild === "1"?firstInput:secondInput,data.conversion_rate);
    }

    getConversionRate();  
  }, [firstSelect,secondSelect]);

  const getAllCodes = async () => {
    fetch("https://v6.exchangerate-api.com/v6/a164929e4a3e57c0a67b0ce0/codes")
      .then(res => res.json())
      .then(data => {
        setIsLoading(true);
        setsupportedCodesg(data.supported_codes);
      }
    )
  }

  useEffect(()=> {
    getAllCodes();
  },[])

  const updateConversion = (value,xyz) =>{
    if(xyz === undefined){
      xyz= conversion_rate;
    }
    if (clickedChild === "1")
    {
      setfirstInput(value);
      setsecondInput(value*xyz);
    }
    else{
      setsecondInput(value);
      setfirstInput(value*(1/xyz));
    }
  }
  return (
    <>
      {isLoading && 
        <div className="content">
          <Currency 
            setCurrencyCode={setfirstSelect} 
            inputValue={firstInput} setinputValue={updateConversion}
            id="1" onClick={() => handleChildClick("1")}
            supportedCodes={supportedCodes}
          />
          
          <div className="seperator">   
          </div>
          
          <Currency 
            setCurrencyCode={setsecondSelect} 
            inputValue={secondInput} setinputValue={updateConversion}
            id="2" onClick={() => handleChildClick("2")}
            supportedCodes={supportedCodes} 
          />
        </div>
      }    
    </>    
  )
}