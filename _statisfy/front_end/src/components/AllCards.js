import { func } from "prop-types";
import { statMethods } from "../static/statMethods";
import Card from "./Card";
import { useState } from "react";


import "../StyleSheets/cardfolder/card.css"
import { Typography } from "@mui/material";

export default function AllCards(props){
    const filtered = statMethods.filter(([name, tags]) => {
        return props.tags.every(tag => tags.includes(tag))
    })

    const [isClicked, setClicked] = useState(true);

    const handleHighlight = function(highlight){
        setClicked(highlight);
    }
    console.log(props.tags)
    return(
        <div className="statContainer">
            <div className="statContainer_sub">
                <Typography>Recommended</Typography>
                {
                    filtered.length !== 0 ? filtered.map(([method, tags]) => {
                        return <Card title={method}  display={props.display} Chosen={props.chosen} isFiltered = {true} handleHighlight = {handleHighlight} isClicked = {isClicked} />
                    }) : <h1>not available</h1>
                }
            </div>
            <div className="statContainer_sub">
                <Typography>All Methods</Typography>
                {
                    statMethods.map(([method,tags]) => {
                        return <Card title={method} display={props.display} Chosen={props.chosen} isFiltered = {false} handleHighlight = {handleHighlight} isClicked = {isClicked}/>
                    })
                }
            </div>

           
        </div>
    )
}