import Checkbox from "../Checkbox";
import AllCards from "../AllCards";




export default function StatPage(props){

     return(
        <div className="dashboard">
            <div className="upload_container">
                <div className="upload_res">
                    <div className="upload_header"><h3>Filter</h3></div>
                    <div className="stat_checkbox">
                        <Checkbox callbackFunction={props.CallbackCheckbox}/>
                    </div> 
                </div>
            </div>

            <div className="upload_container">
                <div className="upload_headerstat">
                    <h3>Statistical Method: {props.MethodChosen}</h3>
                </div>
                <AllCards tags={props.Tags} display={props.DisplayMethodChosen}/>
                
            </div>
        </div>
     ); 
 }