import Latex from "react-latex-next";
import "../../../StyleSheets/computationscss/computation.css"


import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MemoizedTable } from "../../DisplayTable";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";



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
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#eeeeee'
        : '#eeeeee',
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
    const ButtonClasses = ButtonStyles();  
    const pr = "$$r_s = 1-\\frac{6\\sum_{i=0}^nd^2_i}{n(n^2-1)}$$";
    const vars = {};

    props.variables.map(([var_name, var_value]) => {
        vars[var_name] = var_value;
    });
    
    return(
        <div className="Computation_pearson">
            <Typography className={ButtonClasses.inputText} variant="h6"> Spearman Rho Rank Correlation Test </Typography>
            <p><i>Note: All values are rounded in four (4) decimal points.</i></p>
            <Accordion
                defaultExpanded = {true}
                TransitionProps={{ unmountOnExit: true }} 
                
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                color="secondary"
                >
                    <Typography className={ButtonClasses.inputText} variant="h6">Formula</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography className={ButtonClasses.inputText}>
                        The Spearman Rho Rank Correlation <Latex>{"$r_s$"}</Latex> is equal to the formula:
                    </Typography>
                    <Latex strict>{pr}</Latex>
                    <Typography className={ButtonClasses.inputText}>
                        where
                    </Typography>
                    <Typography className={ButtonClasses.inputText}>
                        <b>· <Latex strict>$d_i$</Latex></b> is the difference in paired ranks.
                    </Typography>
                    <Typography className={ButtonClasses.inputText}>
                        <b>· <Latex strict>$n$</Latex></b> is the number of data.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded = {false}
                TransitionProps={{ unmountOnExit: true }} 
                
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                color="secondary"
                >
                    <Typography className={ButtonClasses.inputText} variant="h6">Step 1: Evaluate <Latex strict>{'$\\sum_{i=0}^nd^2_i$'}</Latex></Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography className={ButtonClasses.inputText}>
                        <b>1.1 </b>
                        Rank each variable's datapoints in descending order. Tabulate each rank of the variables' datapoints. An example is shown below.
                    </Typography>
                    <MemoizedTable
                        data={
                            [
                                {'Variable X': 'X1', 'Variable Y': 'Y1', 'Rank of X': 'Rank of X1', 'Rank of Y': 'Rank of Y1'},
                                {'Variable X': '...', 'Variable Y': '...', 'Rank of X': '...', 'Rank of Y': '...'},
                                {'Variable X': 'Xn', 'Variable Y': 'Yn', 'Rank of X': 'Rank of Xn', 'Rank of Y': 'Rank of Yn'},
                            ]
                        } 
                        rowNumber={15}
                        checked={false}
                    />
                    <br/>
                    <Typography className={ButtonClasses.inputText}>
                        <b>1.2 </b>
                        Subtract each ranks of variable <Latex strict>$X$</Latex> and ranks of variable <Latex strict>$Y$</Latex>. The answer should be on its absolute value. It is shown by the formula below. Tabulate the results.
                        <Latex strict>
                        {
                            "$$d_i=\\text{abs}(\\text{rank}(X_i)-\\text{rank}(Y_i))$$"
                        }
                    </Latex>
                    </Typography>

                    <p>
                        <i>Note: <Latex strict>{"$\\text{abs}$"}</Latex> refers to absolute value. We only care about the difference of your <Latex strict>$x$</Latex> and <Latex strict>$y$</Latex> variables not their signed difference.</i>
                    </p>

                    <MemoizedTable
                        data={
                            [
                                {'Variable X': 'X1', 'Variable Y': 'Y1', 'Rank of X': 'Rank of X1', 'Rank of Y': 'Rank of Y1', 'd': 'Rank X1 - Rank Y1'},
                                {'Variable X': '...', 'Variable Y': '...', 'Rank of X': '...', 'Rank of Y': '...', 'd': '...'},
                                {'Variable X': 'Xn', 'Variable Y': 'Yn', 'Rank of X': 'Rank of Xn', 'Rank of Y': 'Rank of Yn', 'd': 'Rank Xn - Rank Yn'},
                            ]
                        } 
                        rowNumber={15}
                        checked={false}
                    />

                    <br/>

                    <Typography className={ButtonClasses.inputText}>
                        <b>1.3 </b>
                        Square each paired rank differences of variables X and Y denoted by <Latex strict>$d$</Latex>.
                    </Typography>

                    <MemoizedTable
                        data={
                            [
                                {'Variable X': 'X1', 'Variable Y': 'Y1', 'Rank of X': 'Rank of X1', 'Rank of Y': 'Rank of Y1', 'd': 'Rank X1 - Rank Y1', 'd^2': '(Rank X1 - Rank Y1)^2'},
                                {'Variable X': '...', 'Variable Y': '...', 'Rank of X': '...', 'Rank of Y': '...', 'd': '...', 'd^2': '...'},
                                {'Variable X': 'Xn', 'Variable Y': 'Yn', 'Rank of X': 'Rank of Xn', 'Rank of Y': 'Rank of Yn', 'd': 'Rank Xn - Rank Yn', 'd^2': '(Rank Xn - Rank Yn)^2'},
                            ]
                        } 
                        rowNumber={15}
                        checked={false}
                    />

                    <br/>

                    <Typography className={ButtonClasses.inputText}>
                        <b>1.4 </b>
                        Calculate the sum of all <Latex strict>$d^2$</Latex> or the paired rank differences squared. It is denoted by the formula below.
                    </Typography>

                    <Latex strict>{'$$\\sum_{i=0}^nd^2_i=\\text{abs}(\\text{rank}(X_i)-\\text{rank}(Y_i))^2$$'}</Latex>

                    <Typography className={ButtonClasses.inputText}>
                        The resulting answer for <b>Step 1</b> would be <Latex>{'$' + `${Number(vars['Rank Diff Squared Sum']).toFixed(4)}` + '$'}</Latex>.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded = {false}
                TransitionProps={{ unmountOnExit: true }} 
                
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                color="secondary"
                >
                    <Typography className={ButtonClasses.inputText} variant="h6">Step 2: Calculate Spearman Rho Correlation</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography className={ButtonClasses.inputText}>
                        <b>2.1 </b>
                        Evaluate the denominator <Latex strict>$n(n^2-1)$</Latex>.
                    </Typography>

                    <Latex strict>{'$$n(n^2-1) = ' + `${Number(vars['Denominator']).toFixed(4)}` + '$$'}</Latex>

                    <Typography className={ButtonClasses.inputText}>
                        <b>2.2 </b>
                        Plugin the paired rank squared differences and the denominator to the equation.
                    </Typography>
                    
                    <Latex strict>{'$$r_s = 1-\\frac{6*' + `${Number(vars['Rank Diff Squared Sum']).toFixed(4)}` + '}{' + `${Number(vars['Denominator']).toFixed(4)}` + '}$$'}</Latex>

                    <Typography className={ButtonClasses.inputText}>
                        The resulting answer will be the Spearman Rho Rank Correlation value <Latex>{"$r_s$"}</Latex> which is equal to <Latex>{"$\\boxed{" + `${Number(vars['Rho Value']).toFixed(4)}` + "}$"}</Latex>.
                    </Typography>

                </AccordionDetails>
            </Accordion>

        </div>
    )
}