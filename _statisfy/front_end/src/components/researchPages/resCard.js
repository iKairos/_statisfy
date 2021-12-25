import "../../StyleSheets/studycardfolder/studycard.css"
import { Button } from "@mui/material";



export default function ResCard(props){

   // const attributes = props.attribute
    return(
        <div className ="StudyCard">
            <div className="StudyCard_title">
                {props.title}
            </div>
            <div className="StudyCard_method">
                {props.created_at}
            </div>
            
            <div className="StudyCard_desc">
                {props.description}
            </div>
            
            <Button 
                onClick={()=>props.HandleSelected(props._id)}
                variant="outlined"
                
            >View Research
            </Button>
            
        </div>
    ); 
}