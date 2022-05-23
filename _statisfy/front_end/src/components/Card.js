import "../StyleSheets/cardfolder/card.css"
import Chip from '@mui/material/Chip';
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";


const ButtonStyles = makeStyles ({
  icons:{
      color: '#7051b8'
  },
  text:{
      fontFamily:'Poppins'
  }
  })


export default function Card(props){
  const ButtonClasses = ButtonStyles();
  const handleClick = function(){
      props.display(props.title)
      if(props.isFiltered){
        props.handleHighlight(props.isFiltered)
      }
      else{
        props.handleHighlight(props.isFiltered)
      }
  }
   // const attributes = props.attribute
  return(
      <div className =
        {props.Chosen === props.title
          ? props.isClicked === props.isFiltered ? "filteredselected": "selected"
          :"cards"
        }
        onClick={()=>handleClick()}>
            <Typography className={ButtonClasses.text} gutterBottom component="div">{props.title}</Typography>

            <p>{props.isClicked}</p>
      </div>
  );  
}