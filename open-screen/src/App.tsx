import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './App.css'

function App() {
  //Sends a message
  const [message, setMessage] = useState("");
  //Get message
  const [result, setResult] = useState("");
  //Loading screen
  const [loading, setLoading] = useState(false);
  //Navigates
  const navigate = useNavigate();
  //Function 
  async function sendMessage()
  {
    try
    {
      //Sets the loading
      setLoading(true);
      //Sends a response
      const response = await fetch(
        "http://192.168.56.1:8000/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            text: message,
          }),
        }
      );

      //Response is an error
      if(!response.ok)
      {
        throw new Error("Python server returned an error");
      }

      //Gets the data
      const data = await response.json();
      //Sets the results to be the variable
      setResult(data.emotion[0]);
      //Sets the loading to false
      setLoading(false);
      console.log(result);
      //Navigates to the next
      navigate("/results", {state: {emotion: result}});
    }
    catch(error)
    {
      console.error(error);
    }
  }
  return (
    <>
      <h1 className="title">STOP!, before you send!</h1>
      <h2 className="instruction">Type under here before you send any message</h2>
      <h2>{loading ? "Loading" : ""}</h2>
      <div className="inputArea">
          <textarea className='message' onChange={(e)=> setMessage(e.target.value)}></textarea>
          <br/>
          <button className='enter' onClick={()=>sendMessage()}>Enter</button>
          <p>{result}</p>
      </div>
    </>
  )
}

export default App
