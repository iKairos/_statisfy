import "../StyleSheets/dataupload.css";
import logo from "../images/uploadLogo.png";
import logoinactive from "../images/uploadLogo-inactive.png";
import {DisplayTable} from "../components/DisplayTable";

import img1 from "../images/statisticsHeader.png";
import MethodCard from "../components/MethodCard";

export default function StatScreen(){
    return(
        <div className="container">
            <div className="row">
                <div className ="insidediv1">
                    
                </div>
            </div>
            
            <div className="row">
                <div className="col-2">
                    <div className="row div1">
                        <div className="insidediv1">
                            <img className="uploadLogo" src={logo} alt="Logo"/>
                            <button className="uploadbtn">UPLOAD DATA</button>
                        </div>
                        
                    </div>
                    <div className="row div2">
                        <div className="insidediv2">2</div>
                    </div>
                </div>
                <div className="col-10 div3">
                    <div className="insidediv3">
                        <DisplayTable/>
                    </div>
                </div>
            </div>

            <div className="row div4">
                <div className="col-12 insidediv3">
                    <MethodCard
                        img = {img1}
                        title ="Pearson R Correlation"
                        content = "Find patterns and generate machine learning models for your predictive and classification researches! Leave the training and model generation to us!"
                        link ="/dashboard/stats/pearson"
                    />
                </div>
            </div>

        </div>
    );
}
