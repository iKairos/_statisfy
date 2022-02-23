import { MemoizedTable } from "../DisplayTable";
import { CircularProgress} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {CategoryScale , 
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    Tooltip as tp,
    Legend,
    DoughnutController,
    ArcElement
} from 'chart.js'; 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    DoughnutController,
    Title,
    tp,
    Legend,
    ArcElement
);

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


export default function StudyDetails(props){
  return(
    <div className="Study_details">
        <Typography variant="h6">Data Preprocessing Results</Typography>
        <div className="Study_details_changes">
            <Typography>Number of Rows: {props.details?.rows} <DoubleArrowIcon/> 1</Typography>
            <Typography>Data Distribution: Not normal <DoubleArrowIcon/> Normal </Typography>
        </div>
        <Accordion
            defaultExpanded = {true}
            TransitionProps={{ unmountOnExit: true }} 
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            color="secondary"
            >
            <Typography variant="h6">Dataset</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="Study_details_row">
                    <Typography variant="h6">Initial Data</Typography>
                    <Typography variant="h6">Processed Data</Typography>
                    {typeof props.data !== 'undefined' ? 
                        <MemoizedTable
                            data= {props.data}
                            Header={true} 
                            rowNumber={5}
                            checked={false}
                        /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                    }

                    {typeof props.data !== 'undefined' ? 
                        <MemoizedTable
                            data= {props.data}
                            Header={true} 
                            rowNumber={5}
                            checked={false}
                        /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                    }
                </div>
            </AccordionDetails>
        </Accordion>
        {
            props.changes.map(change => {
                return(
                    <Accordion
                        defaultExpanded = {true}
                        TransitionProps={{ unmountOnExit: true }} 
                    >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        color="secondary"
                        >
                        <Typography variant="h6">{change.column} Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            

                            <div className="Study_details_row">
                                <Typography variant="h6">Initial Data Distribution</Typography>
                                <Typography variant="h6">Processed Data Distribution</Typography>
                                <div className="Study_details_graph">
                                    <p>graph here</p>
                                </div>

                                <div className="Study_details_graph">
                                    <p>graph here</p>
                                </div>

                            </div>

                            <div className="Study_details_changes_grid">
                                <div className = "Study_details_changes_category">
                                    <Typography>Null Values Deleted: </Typography>
                                    <Typography>Null Values Replaced :</Typography>
                                    <Typography>Outliers Deleted: </Typography>
                                    <Typography>Outliers Replaced: </Typography>
                                
                                </div>

                                <div className = "Study_details_changes_results">
                                    <Typography>{change.null_deleted} row(s)</Typography>
                                    <Typography>{change.null_replaced} row(s)</Typography>
                                    <Typography>{change.outlier_deleted} row(s)</Typography>
                                    <Typography>{change.outlier_replaced} row(s)</Typography>

                                </div>

                            </div>
                        </AccordionDetails>
                    </Accordion>
                )
            })
        }
    </div>
  );  
}