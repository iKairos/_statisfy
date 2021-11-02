import { Link } from "react-router-dom";

import { Col, Row, Button, Card} from "react-bootstrap";
import StatScreen from "../DashboardContents/StatsMethods";
import MLScreen from "../DashboardContents/MachineLearning";

import img1 from "../images/statisticsHeader.png";
import img2 from "../images/mlHeader.png";
import "../StyleSheets/dashboard.css";



export default function DashboardScreen(){
    return(

        <div className="wrapper">
                    <MethodCard
                        img = {img1}
                        title ="Statistic Methods"
                        content = "Analyze and interpret the dataset you have and unlock the intricacies of relationships, associations, and patterns!"
                        link="/dashboard/stats"
                    />
                    <MethodCard
                        img = {img2}
                        title ="Machine Learning"
                        content = "Find patterns and generate machine learning models for your predictive and classification researches! Leave the training and model generation to us!"
                        link ="/dashboard/machinelearning"
                     />
        </div>
        
        
    );
}

function MethodCard(props){
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
/*
<Row>
<Link to="/dashboard/stats">Stats</Link>
</Row>
<Row>
  <Link to="/dashboard/machinelearning">ML</Link>
</Row>*/
