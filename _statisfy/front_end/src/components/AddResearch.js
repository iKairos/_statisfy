//Hindi na to ginagamit



import MethodCard from "./MethodCard";
import "../StyleSheets/dashboard.css";
import img1 from "../images/statisticsHeader.png";
import img2 from "../images/mlHeader.png";

export default function AddResearch(){
    return(
        <div className="newRes row">
            <div className="resName col sm-12 lg-4">
                <div className="title row">
                    <h2>New Research</h2>
                </div>
                <div className="resDesc">
                        <input>
                        </input> 
                        <span></span>
                        <label>Research Title</label>

                        <input>
                        </input> 
                        <span></span>
                        <label>Research Description</label>
                </div>
            </div>
            <div className="choicesHolder col-7">
                <div className="title">
                    <h2>Research Tool</h2>
                </div>
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
                
            </div>
        </div>
        
    ); 
}