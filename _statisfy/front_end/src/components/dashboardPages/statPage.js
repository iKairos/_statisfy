import Checkbox from "../Checkbox";
import AllCards from "../AllCards";
import { Alert, Grow } from "@mui/material";




export default function StatPage(props){

     return(
        <div className="dashboard">
            <div className="upload_container">
                <div className="upload_res">
                    <div className="upload_header"><h3>Filter</h3></div>
                    <div className="stat_checkbox">
                        {props.Error && (
                            <Grow in={props.Error} {...(props.Error ? { timeout: 1000 } : {})}>
                                <Alert variant="outlined" severity="error">{props.Error}</Alert>
                            </Grow>
                        )}
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