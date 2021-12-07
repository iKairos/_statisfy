import { func } from "prop-types";
import { useState } from "react";
import "../StyleSheets/checkbox.css";

export default function Checkbox({callbackFunction}){
    const [ checked, setChecked] = useState([]);

    return (
        <div className="contStyle">
            <div className = "divStyle">    
                <span className="upload_span"> Variable Count:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onChange={callbackFunction(checked)} onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "One Variable"]) : setChecked(checked.filter((i) => i !== "One Variable"))
                    }}/>
                    <label>
                         One variable
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Variables"]) : setChecked(checked.filter((i) => i !== "Two Variables"))
                    }}/>
                    <label>
                        Two variables
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Multiple Variables"]) : setChecked(checked.filter((i) => i !== "Multiple Variables"))
                    }}/>
                    <label>
                        Two or more variables
                    </label>
                </div>
            </div>

            

            <div className = "divStyle">    
                <span className="upload_span"> Type of Variable:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ordinal"]) : setChecked(checked.filter((i) => i !== "Ordinal"))
                    }}/>
                    <label >
                         Ordinal
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Interval"]) : setChecked(checked.filter((i) => i !== "Interval"))
                    }}/>
                    <label>
                        Interval
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ratio"]) : setChecked(checked.filter((i) => i !== "Ratio"))
                    }}/>
                    <label>
                        Ratio
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Nominal"]) : setChecked(checked.filter((i) => i !== "Nominal"))
                    }}/>
                    <label>
                        Nominal
                    </label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <span className="upload_span"> Type of Data:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Grouped"]) : setChecked(checked.filter((i) => i !== "Grouped"))
                    }}/>
                    <label >
                         Grouped
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Ungrouped"]) : setChecked(checked.filter((i) => i !== "Ungrouped"))
                    }}/>
                    <label>
                        Ungrouped
                    </label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <span className="upload_span"> Purpose of Analysis:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Relationship"]) : setChecked(checked.filter((i) => i !== "Relationship"))
                    }}/>
                    <label >
                         Relationship
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Significant Differences"]) : setChecked(checked.filter((i) => i !== "Significant Differences"))
                    }}/>
                    <label>
                        Significant Differences
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Univariate Analysis"]) : setChecked(checked.filter((i) => i !== "Univariate Analysis"))
                    }}/>
                    <label>
                        Univariate Data Analysis
                    </label>
                </div>
               
            </div>

            <div className = "divStyle">    
                <span className="upload_span"> Number of Groups:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Groups"]) : setChecked(checked.filter((i) => i !== "Two Groups"))
                    }}/>
                    <label >
                        Two
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Multiple Groups"]) : setChecked(checked.filter((i) => i !== "Multiple Groups"))
                    }}/>
                    <label>
                        Three or more
                    </label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <span className="upload_span"> Number of Independent Variables:</span>
                    
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "One Independent Variable"]) : setChecked(checked.filter((i) => i !== "One Independent Variable"))
                    }}/>
                    <label >
                        One
                    </label>
                </div>
                <div className="checkbox_div">
                    <input type="checkbox" className="checkbox_child" onClick={(e) => {
                        e.target.checked ? setChecked([ ...checked, "Two Independent Variables"]) : setChecked(checked.filter((i) => i !== "Two Independent Variables"))
                    }}/>
                    <label>
                        Two
                    </label>
                </div>
               
            </div>             
        </div>
    )
}