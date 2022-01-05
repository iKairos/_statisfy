import "../StyleSheets/studycardfolder/studycard.css"
import { Button } from "@mui/material";



export default function StudyCard(props){

   // const attributes = props.attribute
    return(
        <div className ="StudyCard">
            <div className="StudyCard_title">
                {props.title}
            </div>
            <div className="StudyCard_method">
                {props.method}
            </div>
            
            <div className="StudyCard_desc">
                {props.description}
            </div>
            <Button 
                onClick={()=>props.HandleSelected(props.id)}
                variant="outlined"
                color="secondary"
            >View Study
            </Button>
            
        </div>
    ); 
}