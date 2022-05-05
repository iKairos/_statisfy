import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import "../StyleSheets/navigator.css";
import { makeStyles } from "@mui/styles";
import { padding } from '@mui/system';
const buttonStyles = makeStyles ({
    field:{
      backgroundColor: "black",
      borderRadius: '0.25rem'
    },
    btn:{
      borderRadius: '1.5rem',
      width: 'fit-content',
      height:'2.5rem',
      color:'#7051b8',
      fontWeight:'500',
      backgroundColor: 'white',
      padding:'0.5rem'
    },
    icon:{
        color:'#7051b8',
    },
    Step:{
        display:'flex',
        justifyContent:'center',
        alightItems:'center'
    }
})

export default function Navigator(props){
    const ButtonClasses = buttonStyles();
    // const attributes = props.attribute
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        setActiveStep(props.ActiveStep);
        props.NextScreen();
    }

    const prevStep =() =>{
        setActiveStep(props.ActiveStep);
        props.PrevScreen();
    }
 
     return(
        <div className="navigator_div">
            <MobileStepper
                variant="text"
                steps={3}
                
                position="static"
                activeStep={props.ActiveStep}
                className={ButtonClasses.Step}
                sx={{ minWidth: 200, maxWidth: 400, flexGrow: 1 , backgroundColor: 'transparent'}}
                nextButton={
                    <Button size="small" onClick={nextStep} disabled={props.ActiveStep === 2} className={ButtonClasses.btn}>
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft className={ButtonClasses.icon}/>
                    ) : (
                        <KeyboardArrowRight className={ButtonClasses.icon}/>
                    )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={prevStep} disabled={props.ActiveStep === 0} className={ButtonClasses.btn}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight className={ButtonClasses.icon}/>
                    ) : (
                        <KeyboardArrowLeft className={ButtonClasses.icon}/>
                    )}
                    Back
                    </Button>
                }
            />
        </div>
     ); 
 }