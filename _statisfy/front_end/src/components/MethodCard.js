import { Link } from "react-router-dom";

import { useState } from "react";

export default function MethodCard(props){
  //  <button className="card_btn">Select</button>

    return(
        <div className ="card">
            
                <h4 className="card_title">{props.title}</h4>
                <div className="card_desc">{props.desc}</div>
                <div className= "card_status">{props.status}</div>
           

        </div>
    ); 
}