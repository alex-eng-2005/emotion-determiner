import { useState } from 'react'
import './App.css'
import Emotion from "../Responses/Emotion.tsx"
import Grammar from "../Responses/Grammar.tsx";
import { useNavigate } from 'react-router-dom';

function App() {
  //Sends a message
  const [message, setMessage] = useState("");
  //Loading screen
  const [loading, setLoading] = useState(false);
  //User chooses what they want to look for
  const [option, setOption] = useState("emotionResults");
  //Sends the messages between the two function
  const navigate = useNavigate();

  //Helps sends a message
  async function sendMessage()
  {
    try
    {
      //Sets the loading
      setLoading(true);
      if(option == "emotionResults")
      {
        //Do sends the data
        const howTheUserFeeling = await Emotion(message);
        //Navigates
        navigate(`/${option}`, {state: {userEmotion: howTheUserFeeling}});
      }
      else
      {
        const correctGrammar = await Grammar(message, option);
        navigate(`/grammerResults`, {state: {grammarCorrect: correctGrammar}});
      }
      //Sets the loading to false
      setLoading(false);
      
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

      <label htmlFor='Emotion'>Choose an option:</label>
      <select value={option} onChange={(e)=>setOption(e.target.value)}>
        <option value="emotionResults">Emotions</option>
        <option value="grammar">Grammar</option>
        <option value="fixSentenceWords">Stronger Words</option>
        <option value="strongerSentence">Stronger Sentence</option>
      </select>

      <h2>{loading ? "Loading" : ""}</h2>
      <div className="inputArea">
          <textarea className='message' onChange={(e)=> setMessage(e.target.value)}></textarea>
          <br/>
          <button className='enter' onClick={()=>sendMessage()}>Enter</button>
      </div>
      
    </>
  )
}

export default App
