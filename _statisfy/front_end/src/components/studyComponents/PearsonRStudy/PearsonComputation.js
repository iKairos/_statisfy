import Latex from "react-latex-next";
import "../../../StyleSheets/computationscss/computation.css"


import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    btn:{
      borderRadius: '0.5rem',
      width:'fit-content',
      height:'2.5rem',
      color:'#7051b8',
      backgroundColor:'white',
      fontWeight:'700',
      paddingLeft:'0.5rem',
      paddingRight:'0.5rem',
      fontFamily:'Poppins',
      border:'1px solid #7051b8',
    },
    tabs:{
        textColor:'white'
    },
    icons:{
        color: '#7051b8'
    },
    inputText:{
        fontFamily:'Poppins',
    }
  })


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid #b5b5b5`,
    '&:before': {
      display: 'none',
    },
    marginBottom: `0.5rem`,
    borderRadius: `0.5rem`,
    backgroundColor: '#eeeeee'
  }));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color:"white"}} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#eeeeee'
        : '#eeeeee',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    borderRadius: `0.5rem`
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#ffffff'
        : '#ffffff',
    borderTop: `1px solid #b5b5b5`,
    borderBottomLeftRadius: `0.5rem`,
    borderBottomRightRadius: `0.5rem`
  }));

  

export default function PearsonComputation(props){
    const pr = "$$r = \\frac{\\sum{(x_i-\\bar{x})\\sum{(y_i-\\bar{y})}}}{\\sqrt{\\sum{(x_i-\\bar{x})^2} \\sum({y_i-\\bar{y})^2}}}$$";
    const vars = {};

    const ButtonClasses = ButtonStyles();   

    props.variables.map(([var_name, var_value]) => {
        vars[var_name] = var_value;
    });

    return(
        <div className="Computation_pearson">
            <Typography variant="h6" className={ButtonClasses.inputText}> Pearson R Correlation</Typography>
            <p className={ButtonClasses.inputText}><i>Note: All values are rounded in four (4) decimal points.</i></p>
            <Accordion
                defaultExpanded = {true}
                TransitionProps={{ unmountOnExit: true }} 
                
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                color="secondary"
                >
                <Typography  className={ButtonClasses.inputText} variant="h6">Formula</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  className={ButtonClasses.inputText}>
                    The Pearson R correlation <Latex>{"$r$"}</Latex> is equal to the formula:
                </Typography>
                <Latex strict>{pr}</Latex>
                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded = {true}
                TransitionProps={{ unmountOnExit: true }} 
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography  className={ButtonClasses.inputText} variant="h6">Step 1: Evaluate Numerator</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{gap:"1rem"}}>
                    <Typography  className={ButtonClasses.inputText}>
                    <b>1.1 </b>
                        Compute for the sum of the difference of each datapoint <Latex>$x_i$</Latex>, <Latex>$y_i$</Latex> and the mean of the variables <Latex>{"$x$"}</Latex>, <Latex>{"$y$"}</Latex> denoted 
                        by <Latex>{"$\\bar{x}$"}</Latex>, <Latex>{"$\\bar{y}$"}</Latex>.
                    </Typography>

                    <Latex strict>
                        {
                            "$$\\sum{(x_i-\\bar{x})}\\sum{(y_i-\\bar{y})}$$"
                        }
                    </Latex>
                    <br/>

                    <Typography  className={ButtonClasses.inputText}>
                    <b>1.2 </b>
                        The mean of variables <Latex>{"$x$"}</Latex>, <Latex>{"$y$"}</Latex> are <Latex>{'$' + `${Number(vars['X Mean']).toFixed(4)}` + '$'}</Latex> and <Latex>{'$' + `${Number(vars['Y Mean']).toFixed(4)}` + '$'}</Latex> respectively.
                    </Typography>

                    <Typography  className={ButtonClasses.inputText}>
                        Plug in the mean of <Latex>{"$x$"}</Latex> and the mean of <Latex>{"$y$"}</Latex> to the equation above.
                    </Typography>

                    
                    <Latex strict>
                        {
                            "$$" + "\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")}" + "$$"
                        }
                    </Latex>
                    <br/>

                    <Typography  className={ButtonClasses.inputText}>
                        <b>1.3 </b>
                        Subsitute each datapoint for <Latex>{"$x$"}</Latex> and <Latex>{"$y$"}</Latex> at index <Latex>{"$i$"}</Latex> and subtract it to the mean of the 
                        respective variables.
                    </Typography>

                        <br/>
                    <Typography  className={ButtonClasses.inputText}>
                        <b>1.4 </b>
                        Calculate the summation of each term and multiply it with each other.
                    </Typography>
                         <br/>
                    <Typography  className={ButtonClasses.inputText}>
                        The resulting answer for <b>Step 1</b> would be <Latex>{'$' + `${Number(vars['Numerator']).toFixed(4)}` + '$'}</Latex>.
                    </Typography>



                </AccordionDetails>
            </Accordion>


            <Accordion
                defaultExpanded = {false}
                TransitionProps={{ unmountOnExit: true }} 
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography variant="h6"  className={ButtonClasses.inputText}>Step 2: Evaluate Denominator</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  className={ButtonClasses.inputText}>
                    <b>2.1 </b>
                    Subtract each datapoint of variables <Latex>{"$x$"}</Latex> and <Latex>{"$y$"}</Latex> to their mean <Latex>{"$\\bar{x}$"}</Latex> and <Latex>{"$\\bar{y}$"}</Latex> and square it.
                </Typography>
                <Latex strict>
                    {
                        "$$\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2}$$"
                    }
                </Latex>
                <Typography  className={ButtonClasses.inputText}>
                <b>2.2 </b>
                    Square the results of <b>2.1</b> and calculate the summation. This is called the <b>Sum of Squares</b> of <Latex>{"$x$"}</Latex> and <b>Sum of Squares</b> of <Latex>{"$y$"}</Latex>. This gives the values:
                </Typography>

                <Latex strict>
                    {
                        "$$\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2} = " + `${Number(vars['SSx']).toFixed(4)}` +"$$"
                    }
                </Latex>

                <Latex strict>
                    {
                        "$$\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2} = " + `${Number(vars['SSy']).toFixed(4)}` + "$$"
                    }
                </Latex>

                <Typography  className={ButtonClasses.inputText}>
                    <b>2.3 </b>
                    Calculate the square root of the product of both <b>Sum of Squares</b> of <Latex>{"$x$"}</Latex> and <b>Sum of Squares</b> of <Latex>{"$y$"}</Latex>.
                </Typography>

                <Latex strict>
                    {
                        "$$ \\sqrt{" + "\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2}}$$"
                    }
                </Latex>

                <Latex>
                    {
                        "$$ \\sqrt{(" + `${Number(vars['SSx']).toFixed(4)}` + ")(" + `${Number(vars['SSy']).toFixed(4)}` + ")}$$"
                    }
                </Latex>

                <Typography  className={ButtonClasses.inputText}>
                    The resulting answer of <b>Step 2</b> would be <Latex>{'$' + `${Number(vars['Denominator']).toFixed(4)}` + '$'}</Latex>.

                </Typography>

               


                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded = {false}
                TransitionProps={{ unmountOnExit: true }} 
                exit={false}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography  className={ButtonClasses.inputText} variant="h6">Step 3: Calculate <Latex>{"$r$"}</Latex> Coefficient</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  className={ButtonClasses.inputText}>
                    <b>3.1 </b>
                    To get the R Correlation value <Latex>{"$r$"}</Latex>, divide the answer for <b>Step 1</b> to the answer of <b>Step 2</b>.
                </Typography>

                <Latex>
                    {
                        "$$r = " + "\\frac{" + `${Number(vars['Numerator']).toFixed(4)}` + "}{" + `${Number(vars['Denominator']).toFixed(4)}` + "}$$"
                    }
                </Latex>

                <Typography  className={ButtonClasses.inputText}>
                    The resulting answer will be the R Correlation value <Latex>{"$r$"}</Latex> which is equal to <Latex>{"$\\boxed{" + `${Number(vars['R Coefficient']).toFixed(4)}` + "}$"}</Latex>.
                </Typography>
                </AccordionDetails>
            </Accordion>

            
        </div>
    )
}