import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: '#e5e5e5',
    },
  },
});

const ButtonStyles = makeStyles ({
  btn:{
    borderRadius: '0.5rem',
    width:'8rem',
    height:'2.5rem',
    color:'#7051b8',
    backgroundColor:'white',
    fontWeight:'700',
    paddingLeft:'0.5rem',
    paddingRight:'0.5rem',
    fontFamily:'Poppins',
    border:'1px solid #7051b8',
  },
  btn2:{
    borderRadius: '0.5rem',
    width:'8rem',
    height:'2.5rem',
    color:'white',
    backgroundColor:'#7051b8',
    fontWeight:'700',
    paddingLeft:'0.5rem',
    paddingRight:'0.5rem',
    fontFamily:'Poppins',
  }
  
})


export default function ToolCard(props) {
  const ButtonClasses = ButtonStyles();   

  return (
      <div className="StudyTools">
        <h6 className="StudyText_toolCardTitle">{props.Title}</h6>
        <p className="StudyText_toolCardDesc">{props.Desc}</p>
        {props.ToolSelected === props.ToolLabel
            ?(
              <Button
                  className={ButtonClasses.btn}
                  variant = "filled"
                  onClick={()=>props.HandleTool()}
              >
                  Selected
              </Button>
            )
            :(
              <Button
                  className={ButtonClasses.btn2}
                  onClick={()=>props.HandleTool(props.ToolLabel)}
                  variant = "filled"
              >
                  Select
              </Button>
            )
                
        }
      </div>
    
  );
}
