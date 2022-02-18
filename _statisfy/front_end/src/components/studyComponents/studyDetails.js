import { MemoizedTable } from "../DisplayTable";
import { CircularProgress} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
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


export default function StudyDetails(props){
  return(
    <div className="Study_details">
        <Typography variant="h6">Initial Data</Typography>
        <div className="Study_details_row">
            
            <div className="Study_details_graph">
                <p>graph here</p>
            </div>

            <div className="Study_details_table">
                {typeof props.data !== 'undefined' ? 
                    <MemoizedTable
                        data= {props.data}
                        Header={true} 
                        rowNumber={5}
                        checked={false}
                    /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                }
            </div>

        </div>

        <Typography variant="h6">Processed Data</Typography>
        <div className="Study_details_row">
            
            <div className="Study_details_graph">
                <p>graph here</p>
            </div>

            <div className="Study_details_table">
                {typeof props.data !== 'undefined' ? 
                    <MemoizedTable
                        data= {props.data}
                        Header={true} 
                        rowNumber={5}
                        checked={false}
                    /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                }
            </div>
            
        </div>

        <Typography variant="h6">Data Changes</Typography>

        <div className="Study_details_changes">
            <Typography>Number of Rows: 2 <DoubleArrowIcon/> 1</Typography>
            <Typography>Data Distribution: Not normal <DoubleArrowIcon/> Normal </Typography>
            <Typography>Null Value Cleaning Method : Deletion</Typography>
            <Typography>Null Values: 100 <DoubleArrowIcon/> 0 </Typography>
            <Typography>Outliers Cleaning Method : Replacement with Mean</Typography>
            <Typography>Outliers: 100 <DoubleArrowIcon/> 0 </Typography>
            
        </div>
        

    </div>
  );  
}