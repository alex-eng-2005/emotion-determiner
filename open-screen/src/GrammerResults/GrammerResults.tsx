import { useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

export default function GrammerResults(): JSX.Element {
    //Gets the data from the other website
    const getLocation = useLocation();
    const { grammarCorrect } = getLocation.state;
    return (
        <>
            <h1>Correct Sentence</h1>
            <div>
                {grammarCorrect}
            </div>
        </>
    )
}