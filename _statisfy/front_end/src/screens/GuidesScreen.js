
import "../StyleSheets/NewCSSFiles/GuidesFolder/GuidesMain.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography,Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { values } from "lodash";


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
    btn:{
      width:'100%',
      height:'fit-content',
      color: '#23272a',
      backgroundColor:'transparent',
      fontFamily:'Poppins',
      border:'none',
      textTransform:'inherit',
      textAlign:'left',
      justifyContent:'flex-start',
      borderTop:'1px solid #e5e5e5',
      padding:'0.5rem'
    },
    tabs:{
        textColor:'white'
    },
    icons:{
        color: '#7051b8'
    },
    text:{
        fontFamily:'Poppins',
        color: '#23272a'
    },
    title:{
        fontFamily:'Poppins',
        color: '#7051b8',
        textAlign:'left'
    },
  })

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `none`,
    '&:before': {
      display: 'none',
    },
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'transparent'
        : 'transparent',
  }));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color:"white"}} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'transparent'
        : 'transparent',
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    paddingLeft : theme.spacing(5),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'transparent'
        : 'transparent',
  }));


export default function GuidesScreen(props){
    const ButtonClasses = ButtonStyles();  
    const [selectedGuide, setSelectedGuide] = useState("default");

    const assignSelectedGuide = function(value){
        setSelectedGuide(value);
    };
    return(
        <div className="Guides">
           
            <div className="Guides_Container">
                <ThemeProvider theme={theme}>
                <div className="Guides_Items">
                    <Button className={ButtonClasses.btn} disableRipple  onClick={()=>{assignSelectedGuide("Statisfy")}}>
                        <Typography variant="h6" className={ButtonClasses.title}>Statisfy</Typography>
                    </Button>
                    <Accordion
                    defaultExpanded = {false}
                    TransitionProps={{ unmountOnExit: true }} 
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={ButtonClasses.text}>Getting Started</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Button className={ButtonClasses.btn} disableRipple onClick={()=>{assignSelectedGuide("Usage")}}>
                                <Typography className={ButtonClasses.text} >Usage</Typography>
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                    defaultExpanded = {false}
                    TransitionProps={{ unmountOnExit: true }} 
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={ButtonClasses.text}>Statistical Methods</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Accordion
                            defaultExpanded = {false}
                            TransitionProps={{ unmountOnExit: true }} 
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={ButtonClasses.text}>Univariate Statistics</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Button className={ButtonClasses.btn} disableRipple onClick={()=>{assignSelectedGuide("Descriptive Statistics")}}>
                                        <Typography className={ButtonClasses.text} >Descriptive Statistics</Typography>
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                            defaultExpanded = {false}
                            TransitionProps={{ unmountOnExit: true }} 
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={ButtonClasses.text}>Relationship</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Button className={ButtonClasses.btn} disableRipple onClick={()=>{assignSelectedGuide("Pearson-R Correlation Coefficient")}}>
                                        <Typography className={ButtonClasses.text} >Pearson-R Correlation Coefficient</Typography>
                                    </Button>
                                    <Button className={ButtonClasses.btn} disableRipple onClick={()=>{assignSelectedGuide("Spearman Rho Rank Correlation Test")}}>
                                        <Typography className={ButtonClasses.text} >Spearman Rho Rank Correlation Test</Typography>
                                    </Button>
                                    
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </div>
                </ThemeProvider>
                <div className="Guides_Content">
                    <Typography variant="h5" className={ButtonClasses.title}>{selectedGuide}</Typography>

                    {selectedGuide === "Statisfy" &&
                        <div className="Guides_Content_Description">
                            <Typography variant="h6" className={ButtonClasses.text}>Description</Typography>
                            <Typography className={ButtonClasses.text}> Anim mollit irure voluptate culpa anim non adipisicing fugiat esse id esse Lorem officia adipisicing.</Typography>
                            <Typography variant="h6" className={ButtonClasses.text}>Version</Typography>
                            <Typography className={ButtonClasses.text}> 1.2.3.4</Typography>
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}