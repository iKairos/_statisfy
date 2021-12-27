import { func } from "prop-types";
import { statMethods } from "../static/statMethods";
import Card from "./Card";
import { useState } from "react";


import "../StyleSheets/cardfolder/card.css"

export default function AllCards(props){
    const filtered = statMethods.filter(([name, tags]) => {
        return props.tags.every(tag => tags.includes(tag))
    })

    const [chosen, setChosen] = useState();

    const displayChosen = (choice) =>{
        setChosen(choice);
    }


    return(
        <div className="statContainer">
            {
                filtered.length !== 0 ? filtered.map(([method, tags]) => {
                    return <Card title={method} desc="desc" attributes={tags} display={displayChosen} Chosen={chosen}/>
                }) : <h1>Oops, nothing here!</h1>
            }

           
        </div>
    )
}