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


export default function ResultCards(props) {
    const [ref, { width }] = useMeasure()
    const [onTrigger, setTrigger] = useState(false);
    const matches = useMediaQuery('(min-width:900px)');

    const cardHover = useSpring({
        width: onTrigger? width : 0,
        alignItems: "center"
        
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
                        

                            <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>                      
                                <div className='Study_cards_text'  >
                                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                                    <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                                </div>
                                
                                    <animated.div style = {cardHover}>
                                        {onTrigger
                                        ?(<IconButton ref= {ref} ><ContentCopyIcon/></IconButton> )
                                        : null
                                        }
                                    </animated.div>
                                    
                                
                            </div>
                </HtmlTooltip>
                )
                :(
                    <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>                      
                        <div className='Study_cards_text'>
                            <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                            <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                        </div>
                    </div>
                )}
            
            </>
        
        )
        :(
            <div className="Study_cards" onClick={()=>setTrigger(!onTrigger)}>
                <div className='Study_cards_text'>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}> {props.value}</Typography>
                    <Typography variant="button" sx={{color:"#a742c5"}}>{props.variable}</Typography>
                </div>
                <IconButton><ContentCopyIcon/></IconButton>                     
            </div>
        )
    
    }
    </>
    
  );
}
