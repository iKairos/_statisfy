//Hindi na to ginagamit

import { useState } from "react";
import "../StyleSheets/dashboard.css";
import AddResearch from "./AddResearch";


import {useSpring, animated} from 'react-spring';


export default function Research(){
    const [onDisplay, setDisplay] = useState(true);

    const props = useSpring({
        marginTop: onDisplay? -700:0,
        opacity: onDisplay? 0 : 1
    })

    return(
        <div>
            <animated.div style={props}>
                <AddResearch/>
            </animated.div>

            <div className="resHeader">
                <h1>Research</h1>
                <button onClick={()=> setDisplay(!onDisplay)}>
                    {onDisplay? <h1>New Research</h1>:<h1>Cancel</h1>}
                </button>
               
            </div>
            
            <div className="container" style={{height:"50rem"}}>

            </div>
        </div>
        
    ); 
}