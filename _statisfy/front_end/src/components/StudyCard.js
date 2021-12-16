import "../StyleSheets/studycardfolder/studycard.css"
import { Button } from "@mui/material";



export default function StudyCard(props){

   // const attributes = props.attribute
    return(
        <div className ="StudyCard">
            <div className="StudyCard_title">
                Study 1
            </div>
            <div className="StudyCard_method">
                Pearson-R Correlation
            </div>
            
            <div className="StudyCard_desc">
                This study aims to ganto ganyan using pearson r correlation for variables ganto ganyan
                This study uses data from ganto then ganyan tas nagpunta sa bundok 
                
            </div>
            <Button 
                onClick={()=>props.HandleSelected(true)}
                variant="outlined"
                
            >View Study
            </Button>
            
        </div>
    ); 
}