import { useState } from "react";

export default function Card(props){
    const [varCount, setVarCount] = useState("");

   // const attributes = props.attribute

    return(
        <div className ="card">
            
                <h4 className="card_title">{props.title}</h4>
                <div className="card_desc">{props.desc}</div>
                <div className="card_tagcont">{props.attributes.map(i=>{
                  return <div className="card_tags">{i}</div>
                })}</div>

           
        </div>
    ); 
}