import { func } from "prop-types";
import { useState } from "react";
import "../StyleSheets/checkbox.css";
import { Typography } from "@mui/material";

export default function Checkbox({callbackFunction}){
    const [ checked, setChecked] = useState([]);

    return (
        <div className="contStyle">
            <div className = "divStyle">    
                <Typography variant="button"> Variable Count:</Typography>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onChange={callbackFunction(checked)} onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "One Variable"]) : setChecked(checked.filter((i) => i !== "One Variable"))
                    }}/>
                    <label>
                         <Typography> One variable</Typography>
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Variables"]) : setChecked(checked.filter((i) => i !== "Two Variables"))
                    }}/>
                    <label><Typography>
                        Two variables
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Multiple Variables"]) : setChecked(checked.filter((i) => i !== "Multiple Variables"))
                    }}/>
                    <label><Typography>
                        Two or more variables
                    </Typography></label>
                </div>
            </div>

            

            <div className = "divStyle">    
                <Typography variant="button"> Type of Variable:</Typography>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ordinal"]) : setChecked(checked.filter((i) => i !== "Ordinal"))
                    }}/>
                    <label><Typography>Ordinal</Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Interval"]) : setChecked(checked.filter((i) => i !== "Interval"))
                    }}/>
                    <label><Typography>
                        Interval
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ratio"]) : setChecked(checked.filter((i) => i !== "Ratio"))
                    }}/>
                    <label><Typography>
                        Ratio
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Nominal"]) : setChecked(checked.filter((i) => i !== "Nominal"))
                    }}/>
                    <label><Typography>
                        Nominal
                    </Typography></label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <Typography variant="button"> Type of Data:</Typography>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Grouped"]) : setChecked(checked.filter((i) => i !== "Grouped"))
                    }}/>
                    <label> <Typography>
                         Grouped
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ungrouped"]) : setChecked(checked.filter((i) => i !== "Ungrouped"))
                    }}/>
                    <label><Typography>
                        Ungrouped
                    </Typography></label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <Typography variant="button"> Purpose of Analysis:</Typography>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Relationship"]) : setChecked(checked.filter((i) => i !== "Relationship"))
                    }}/>
                    <label> <Typography>
                         Relationship
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Significant Differences"]) : setChecked(checked.filter((i) => i !== "Significant Differences"))
                    }}/>
                    <label><Typography>
                        Significant Differences
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Univariate Analysis"]) : setChecked(checked.filter((i) => i !== "Univariate Analysis"))
                    }}/>
                    <label><Typography>
                        Univariate Data Analysis
                    </Typography></label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <Typography variant="button"> Number of Groups:</Typography>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Groups"]) : setChecked(checked.filter((i) => i !== "Two Groups"))
                    }}/>
                    <label> <Typography>
                        Two
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Multiple Groups"]) : setChecked(checked.filter((i) => i !== "Multiple Groups"))
                    }}/>
                    <label><Typography>
                        Three or more
                    </Typography></label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <Typography variant="button"> Independent Variables:</Typography>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "One Independent Variable"]) : setChecked(checked.filter((i) => i !== "One Independent Variable"))
                    }}/>
                    <label> <Typography>
                        One
                    </Typography></label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Independent Variables"]) : setChecked(checked.filter((i) => i !== "Two Independent Variables"))
                    }}/>
                    <label><Typography>
                        Two </Typography>
                    </label>
                </div>
               
            </div>             
        </div>
    )
}