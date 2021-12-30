import * as React from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';
import {useSpring, animated} from 'react-spring';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function ResultCards(props) {
    const [onTrigger, setTrigger] = useState(false);
    const matches = useMediaQuery('(min-width:900px)');
    console.log(matches);

    const cardHover = useSpring({
        width: onTrigger? "15rem":"10rem"
    })
  return (
      <>
    {matches 
        ? (
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
        </animated.div>)
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
