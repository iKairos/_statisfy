import "../../StyleSheets/resdatafolder/resdata.css"
import { Button, Tooltip } from "@mui/material";
import { Typography, Divider, useMediaQuery } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {CategoryScale , 
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    Tooltip as tp,
    Legend
} from 'chart.js'; 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    tp,
    Legend
);

export default function ColumnGraphs(props){
    const matches = useMediaQuery('(min-width:900px)');

    return(
        <div className ="colCard">
            <div className="colCard_title">
                <Typography variant="h6">{props.data.column}</Typography>
            </div>
                <Divider/>
            <div className="colCard_content">
                <div className="colCard_graph">
                    {
                        typeof props.data.vis === "string" ? "Placeholder for string columns" :
                        <Bar
                            data={{
                                datasets: [
                                    {
                                        data: props.data.vis.map(i => i[1]),
                                        label: 'Frequency',
                                        barPercentage: 1.0,
                                        categoryPercentage: 1.0,
                                        backgroundColor: 'rgba(167, 66, 197, 0.2)',
                                        borderColor: 'rgba(167, 66, 197, 1)',
                                        borderWidth: 0.5
                                    },
                                ],
                                labels: props.data.vis.map(i => i[0])
                            }}
                        />
                    }
                </div>
                <div className="colCard_details">
                    {!matches? 
                        <Divider/> : null
                    }
                    
                    <Typography variant="button">Mean: {props.data.mean}</Typography>
                    <Typography variant="button">Normality: {props.data.distribution}</Typography>
                    <Typography variant="button">Median: {props.data.median}</Typography>
                    <Typography variant="button">Min: {props.data.min}</Typography>
                    <Typography variant="button">Max: {props.data.max}</Typography>
                    <Typography variant="button">std.dev: {props.data.std}</Typography>
                    <Typography variant="button">Null Count: {props.data.null_count} {((props.data.null_count / props.size) * 100).toFixed(2)}%</Typography>
                </div>
            </div>
            
               
        </div>
    ); 
}