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


export default function ResultCards(props) {

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
                <div className="Study_cards">  
                    
                        <div className='Study_cards_text'>
                            <AssessmentIcon fontSize='medium' color="secondary"/>
                            <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                            <p className="Study_cards_text_value"> {props.value}</p>
                            
                        </div>  
                </div>
                    
            </HtmlTooltip>
    
    
  );
}
