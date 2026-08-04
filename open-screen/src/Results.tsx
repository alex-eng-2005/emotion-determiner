//Imports 
import { useLocation } from "react-router-dom";
export default function Results()
{
    const location = useLocation();
    //const {emotion} = location.state
    console.log(location.state)
    return (
    <>
        <h1>Hello</h1>
    </>
    );
}