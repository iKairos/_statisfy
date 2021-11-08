import { Link } from "react-router-dom";
import "../StyleSheets/methodcard.css";

export default function MethodCard(props){
    return(
    <div className="card">
        <div className="card_body">
            <img className="card_image" src ={props.img}/>
            <h2 className= "card_title">{props.title}</h2>
            <p className= "card_desc">
            {props.content}
            </p>
        </div>
        
        <Link className="card_link" to={props.link}><button className ="card_btn">Proceed</button></Link>
    </div>   
    ); 
}