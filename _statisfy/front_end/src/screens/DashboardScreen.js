import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { Col, Row } from "react-bootstrap";



export default function DashboardScreen(){
    return(
        <div>
            <Row>
                <Link to="/dashboard/stats">Stats</Link>
            </Row>
            <Row>
                  <Link to="/dashboard/machinelearning">ML</Link>
            </Row>
            
            
        </div>
        
        
    );
}
