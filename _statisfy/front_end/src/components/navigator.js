import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import "../StyleSheets/navigator.css";


export default function Navigator(props){

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
                variant="dots"
                steps={3}
                position="static"
                activeStep={props.ActiveStep}
                color = "secondary"
                sx={{ maxWidth: 400, flexGrow: 1 , backgroundColor: 'transparent'}}
                nextButton={
                    <Button size="small" onClick={nextStep} disabled={props.ActiveStep === 2} color = "secondary">
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={prevStep} disabled={props.ActiveStep === 0} color = "secondary">
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                    </Button>
                }
            />
        </div>
     ); 
 }