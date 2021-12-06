import { Alert, Grow } from "@mui/material";



export default function TitlePage(props){
    
     return(
        <div className="dashboard">
            <div className ="dashboard_container">
                <div className="dashboard_header">
                    <h3>Describe Your Research</h3>
                </div>
                <div className="res">
                    {props.Error && (
                        <Grow in={props.Error} {...(props.Error ? { timeout: 1000 } : {})}>
                            <Alert variant="outlined" severity="error">{props.Error}</Alert>
                        </Grow>
                    )}
                    <div className="res_div">
                        <span className="res_span">Research Title ({props.Title.length}/200 characters)</span>
                        <input className="res_title" value={props.Title} placeholder="Research Title" onChange={(e) => props.HandleTitle(e)}></input>
                    </div>
                    <div className="res_div">
                        <span className="res_span">Research Description ({props.Description.length}/250 characters)</span>
                        <textarea className="res_desc" value={props.Description} placeholder="Description" onChange={(e) => props.HandleDescription(e)}></textarea>
                    </div>
                </div>
            </div>
        </div>
     ); 
 }