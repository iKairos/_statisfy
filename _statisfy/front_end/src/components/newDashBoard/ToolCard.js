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

const theme = createTheme({
  palette: {
    primary: {
      main: '#e5e5e5',
    },
  },
});


export default function ToolCard(props) {

  return (
    <Card sx={{ width: '1fr' }}>
      <div className = {props.ToolLabel === "Statistical Method"? "resList_stat_overlay": "resList_ml_overlay"}>
        <div className = {props.ToolLabel === "Statistical Method"? "resList_stat": "resList_ml"}>
          <CardContent>
            <Typography variant="h6" className="resList_stat_title">
                {props.Title}
            </Typography>

            <Typography paragraph className="resList_stat_title">
                {props.Desc}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ThemeProvider theme={theme}>
              {props.ToolSelected === props.ToolLabel
              ?(
                <Button
                    color="primary"
                    variant = "contained"
                    onClick={()=>props.HandleTool()}
                >
                    Selected
                </Button>
              )
              :(
                <Button
                    color="secondary"
                    onClick={()=>props.HandleTool(props.ToolLabel)}
                    variant = "contained"
                >
                    Select
                </Button>
              )
                
              }
               </ThemeProvider>
            
          </CardActions>
        </div>
      </div>
      
      
    </Card>
  );
}
