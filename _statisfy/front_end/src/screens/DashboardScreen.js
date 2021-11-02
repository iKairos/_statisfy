import { Col, Row, Button, Card} from "react-bootstrap";
import StatScreen from "../DashboardContents/StatsMethods";
import MLScreen from "../DashboardContents/MachineLearning";

import img1 from "../images/statisticsHeader.png";
import img2 from "../images/mlHeader.png";
import "../StyleSheets/dashboard.css";

import MethodCard from "../components/MethodCard";

export default function DashboardScreen(){
    return(
        <div className="wrapper">
            <MethodCard
                img = {img1}
                title ="Statistical Analysis"
                content = "Analyze and interpret the dataset you have using statistical methods. Leave the computation to us!"
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
/*
<Row>
<Link to="/dashboard/stats">Stats</Link>
</Row>
<Row>
  <Link to="/dashboard/machinelearning">ML</Link>
</Row>*/
