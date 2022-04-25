import { Typography } from '@mui/material';
import * as React from 'react';
import {useSpring, animated} from 'react-spring';
import useMeasure from 'react-use-measure'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function BarCor(props) {
    const [ref, { width }] = useMeasure()
    const PosBar = useSpring({
        width: props.value > 0 ?  props.value * width : 1,
        backgroundColor: "#a742c5",
        height: "1rem"
    })
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
            Correlation Strength: {Math.abs((props.value * 100).toFixed(2))}%  {props.value > 0 ? <TrendingUpIcon color='success' fontSize='medium'/> : props.value < 0 ? <TrendingDownIcon color='error' fontSize='medium'/> : null}
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
