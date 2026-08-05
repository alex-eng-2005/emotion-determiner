//Imports 
import { useLocation } from "react-router-dom";
import "./Results.css"

interface Emotion {
    label: string;
    score: number;
    [key: string]: any;
}

interface LocationState {
    userEmotion: Emotion[];
}

export default function Results()
{
    const location = useLocation();
    const { userEmotion } = location.state as LocationState;
    const emotion = userEmotion[0];
    const sarcasm = userEmotion[1];

    return (
    <>
        <h1>Results</h1>
        <table className="table">
            <tbody>
                 
                <tr>
                    <td>Emotion</td>
                    <td>Score</td>
                </tr>
                
                {emotion.map((e : Emotion) => (
                    <tr key={e.label}>
                        <td>{e.label}</td>
                        <td>{e.score.toFixed(3)}</td>
                    </tr>
                ))}
            
            </tbody>
            </table>
            
            <br/>
            <table className="table">
            <tbody>
                 
                <tr>
                    <td>Sarcasm</td>
                    <td>Score</td>
                </tr>
                
                {sarcasm.map((e : Emotion) => (
                    <tr key={e.label == "LABEL_0" ? "Not Sarcastic" : "Sarcastic"}>
                        <td>{e.label == "LABEL_0" ? "Not Sarcastic" : "Sarcastic"}</td>
                        <td>{e.score.toFixed(3)}</td>
                    </tr>
                ))}
            
            </tbody>
            </table>
    </>
    );
}