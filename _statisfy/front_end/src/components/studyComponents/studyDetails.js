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

        <Typography variant="h6">Data Preprocessing Results</Typography>

        <div className="Study_details_changes">
            <Typography>Number of Rows: {props.details?.rows} <DoubleArrowIcon/> 1</Typography>
            <Typography>Data Distribution: Not normal <DoubleArrowIcon/> Normal </Typography>
            <hr/>
            {
                props.changes.map(change => {
                    return(
                        <div className = "Study_details_changes_rows">
                            <Typography>{change.column}</Typography>
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
                            <hr/>
                            
                        </div>
                    )
                })
            }
        </div>
    </div>
  );  
}