import Checkbox from "../Checkbox";
import AllCards from "../AllCards";
import { Alert, Grow } from "@mui/material";
import "../../StyleSheets/statpagefolder/statpage.css";



export default function StatPage(props){

     return(
        <div className="statpage">
            <div className="statpage_container">
                <div className="statpage_filter">
                        <div className="statpage_header">
                            <h3>Method Filter</h3>
                            {props.Error && (
                                <Grow in={props.Error} {...(props.Error ? { timeout: 1000 } : {})}>
                                    <Alert variant="outlined" severity="error">{props.Error}</Alert>
                                </Grow>
                            )}
                        </div>
                    <div className="statpage_checkbox">
                        
                        <Checkbox callbackFunction={props.CallbackCheckbox}/>
                    </div> 
                    
                </div>
                <div className="statpage_methods_container">
                    <div className="statpage_header">
                        <h3>Statistical Method: {props.MethodChosen}</h3>
                    </div>
                    <div className="statpage_methods">
                         <AllCards tags={props.Tags} display={props.DisplayMethodChosen}/>
                    </div>
                   
                </div>

            </div>
            
        </div>
     ); 
 }