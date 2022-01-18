import "../../StyleSheets/resdatafolder/resdata.css"
import { Button, Tooltip } from "@mui/material";
import { Typography, Divider, useMediaQuery } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
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
                        props.data.type === "numerical" && 
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

                            options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        }
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                display: false,
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                display: false
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            }
                                        },
                                        xAxes: [{
                                            display: false
                                        }],
                                        yAxes: [{
                                            display: false
                                        }]
                                    },
                                    
                                }
                            }
                        />
                    }

                    {
                        props.data.type === "object" && 
                        <Doughnut
                            data={{
                                datasets: [
                                  {
                                    data: Object.keys(props.data.vis).map((e, i) => props.data.vis[e]),
                                    label: 'Frequency',
                                    borderWidth: 8,
                                    backgroundColor: 'rgba(167, 66, 197, 0.2)',
                                    borderColor: 'rgba(167, 66, 197, 1)',
                                    borderWidth: 0.5
                                  }
                                ],
                                labels: Object.keys(props.data.vis).map((e) => e)
                              }}

                              options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                },
                              }}
                        />
                    }
                </div>

                <div className="colCard_details">
                    {!matches? 
                        <Divider/> : null
                    }
                    <div className="colCard_row">
                        <Typography variant="button">Mean:</Typography>
                        <Typography variant="button">{props.data.mean}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Normality:</Typography>
                        <Typography variant="button">{props.data.distribution}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Median:</Typography>
                        <Typography variant="button">{props.data.median}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Min:</Typography>
                        <Typography variant="button">{props.data.min}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Max:</Typography>
                        <Typography variant="button">{props.data.max}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">std.dev:</Typography>
                        <Typography variant="button">{props.data.std}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Null Count: </Typography>
                        <Typography variant="button">
                            <span style={{'color': (props.data.null_count / props.size) * 100 > 60 ? "red" : "green"}}>{props.data.null_count} </span> • <span style={{'color': (props.data.null_count / props.size) * 100 > 60 ? "red" : "green"}}>{((props.data.null_count / props.size) * 100).toFixed(2)}%</span>
                        </Typography>
                    </div>      
                </div>
            </div>         
        </div>
    ); 
}