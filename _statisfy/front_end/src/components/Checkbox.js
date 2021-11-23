import { func } from "prop-types";
import { useState } from "react";
import "../StyleSheets/checkbox.css";

export default function Checkbox(){
    return (
        <div className = "contStyle">
            <div className = "divStyle" >    
                <span className="upload_span"> Variable Count:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label for="one-numvar">
                         One variable
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label for="two-numvar">
                        Two variables
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label for="three-numvar">
                        Two or more variables
                    </label>
                </div>
            </div>

            

            <div className = "divStyle" >    
                <span className="upload_span"> Type of Variable:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label >
                         Ordinal
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Interval
                    </label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <span className="upload_span"> Type of Data:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label >
                         Grouped
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Ungrouped
                    </label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <span className="upload_span"> Purpose of Analysis:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label >
                         Relationship
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Significant Differences
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Univariate Data Analysis
                    </label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <span className="upload_span"> Number of Groups:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label >
                        Two
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Three or more
                    </label>
                </div>
               
            </div>

            <div className = "divStyle" >    
                <span className="upload_span"> Number of Independent Variables:</span>
                    
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label >
                        One
                    </label>
                </div>
                <div>
                    <input type="checkbox" className="checkbox_child"/>
                    <label>
                        Two
                    </label>
                </div>
               
            </div>

            
            
                                
            
            
           
                               
        </div>
       
    
)
}