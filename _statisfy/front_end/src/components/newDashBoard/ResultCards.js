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

export default function ResultCards(props) {
    const [onTrigger, setTrigger] = useState(false);
    const matches = useMediaQuery('(min-width:900px)');
    console.log(matches);

    const cardHover = useSpring({
        width: onTrigger? "15rem":"10rem"
    })



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
      <>
    {matches 
        ? (
            <>
                {onTrigger
                ?(
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                            <Typography color="inherit">{props.variable}</Typography>
                            {"This variable is responsible for my child <3 rovvicvic"}
                        </React.Fragment>
                        }
                        placement="bottom-start"
                    >

                        <animated.div style = {cardHover}>
                            <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>                      
                                <div className='Study_cards_text'>
                                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                                    <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                                </div>
                                {onTrigger
                                    ? (
                                        <div className="Study_cards_icon">
                                            
                                        <IconButton ><ContentCopyIcon/></IconButton> 
                                        </div>
                                    )
                                    : null
                                }
                                
                            </div>
                        </animated.div>
                </HtmlTooltip>
                )
                :(
                    <animated.div style = {cardHover}>
                        <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>                      
                            <div className='Study_cards_text'>
                                <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                                <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                            </div>
                            {onTrigger
                                ? (
                                    <div className="Study_cards_icon">
                                        
                                    <IconButton ><ContentCopyIcon/></IconButton> 
                                    </div>
                                )
                                : null
                            }
                            
                        </div>
                    </animated.div>
                )}
            
            </>
        
        )
        :(
            <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>
                <div className='Study_cards_text'>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                    <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                </div>
                <IconButton/>                      
            </div>
        )
    
    }
    </>
    
  );
}
