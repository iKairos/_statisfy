import * as React from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';
import {useSpring, animated} from 'react-spring';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import useMeasure from 'react-use-measure'
import { variableTooltip } from '../../constants/stringConstants';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#7051b8',
    },
    secondary: {
      main: '#7051b8',
    },
  },
});

const ButtonStyles = makeStyles ({
  inputText:{
      fontFamily:'Poppins',
  }
})


export default function ResultCards(props) {
  
  const ButtonClasses = ButtonStyles(); 
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
        }));
  return (
            <HtmlTooltip
                title={
                   <React.Fragment>
                        <Typography color="inherit">{props.variable}</Typography>
                        {variableTooltip[props.variable]}
                    </React.Fragment>
                }
                placement="bottom-start"
            >
              <ThemeProvider theme={theme}>
                <div className="Study_cards">  
                    <div className='Study_cards_text'>
                        <AssessmentIcon fontSize='medium' color="secondary"/>
                        <Typography className={ButtonClasses.inputText} variant="h6" sx={{color:"#7051b8"}} >{props.variable}</Typography>
                        <p className={ButtonClasses.inputText}> {props.value}</p>
                        
                    </div>  
                </div>
              </ThemeProvider>
               
                    
            </HtmlTooltip>
    
    
  );
}
