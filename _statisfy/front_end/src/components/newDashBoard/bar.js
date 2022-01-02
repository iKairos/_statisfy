import { Typography } from '@mui/material';
import { height } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import {useSpring, animated} from 'react-spring';
import useMeasure from 'react-use-measure'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function BarCor(props) {
    const [ref, { width }] = useMeasure();
    const [barValue, setValue] = useState(true);
    const PosBar = useSpring({
        width: props.value > 0 ?  props.value * width : 1,
        backgroundColor: "#a742c5",
        height: "1rem"
    });

    const NegBar = useSpring({
        minWidth: props.value < 0 ? props.value * width * -1 : 1,
        backgroundColor: "#b5b5b5",
        position: "absolute",
        right: 0,
        height: "1rem"
    });

  return (
    <div className='Correlation'>
        <Typography variant="h6" className ="Correlation_Header">
            Correlation Strength: {Math.abs((props.value * 100).toFixed(2))}% {props.value > 0 ? <ArrowUpwardIcon color='success' fontSize='medium'/> : props.value < 0 ? <ArrowDownwardIcon color='error' fontSize='medium'/> : null}
        </Typography>
        <div className ="Bar">
            <div className = "Bar_Left_cont">
                <animated.div style ={NegBar}/>
            </div>
            <div className ="Bar_Right_cont"  ref = {ref}>
                <animated.div style ={PosBar}/>
            </div>
        </div>
        <div className='Numerics'>
            <Typography>-1.0</Typography>
            <Typography>0</Typography>
            <Typography>1.0</Typography>
        </div>
    </div>
  );
}
