
import "../StyleSheets/dashboard.css";

import UserProfile from "../components/UserProfile";
import Research from "../components/Research";

export default function DashboardScreen(){
            
    return(
        <div>
            <div className = "container">
                <UserProfile/>
            </div>
            <div className = "container">
                <Research/>
                
            </div>
            
        </div>
        
        
        
    );
}
