import "../StyleSheets/cardfolder/card.css"
import Chip from '@mui/material/Chip';
import { Typography } from "@mui/material";
export default function Card(props){

   // const attributes = props.attribute
    return(
        <div className =
          {props.Chosen === props.title
            ?"selected"
            :"cards"
          }
          onClick={()=>props.display(props.title)}>
            
              <Typography variant="h5" gutterBottom component="div">{props.title}</Typography>
                <div className="cards_desc">{props.desc}</div>
                
                <div className="cards_tagcont">{props.attributes.map(i=>{
                  return <Chip label={i} variant="filled" />
                })}</div>

           
        </div>
    );  
}