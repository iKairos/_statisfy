import "../../StyleSheets/resdatafolder/resdata.css"
import { Button, Tooltip } from "@mui/material";
import { Typography, Divider, useMediaQuery } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import React from 'react';
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
                                        backgroundColor: 'rgba(100, 87, 196, 1)',
                                        borderColor: 'white',
                                        borderWidth: 0.5,
                                        borderRadius: 10,
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
                                    borderWidth: 10,
                                    borderRadius: 30,
                                    backgroundColor: Object.keys(props.data.vis).length === 3 ? ['rgba(53, 113, 148, 1)','rgba(100, 87, 196, 1)', 'rgba(230, 150, 232, 1)'] : ['rgba(53, 113, 148, 1)', 'rgba(100, 87, 196, 1)'],

                                  }
                                ],
                                labels: Object.keys(props.data.vis).map((e) => e)
                              }}

                              options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                cutout: '75%',
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
                        <Typography variant="button">outliers:</Typography>
                        <Typography variant="button">{props.data.outliers}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Null Count: </Typography>
                        <Typography variant="button">
                            <span style={{'color': (props.data.null_count / props.size) * 100 > 60 ? "red" : "green"}}>{props.data.null_count} </span> • <span style={{'color': (props.data.null_count / props.size) * 100 > 60 ? "red" : "green"}}>{((props.data.null_count / props.size) * 100).toFixed(2)}%</span>
                        </Typography>
                    </div>      
                    <div className="colCard_row">
                        <Typography variant="button">skew:</Typography>
                        <Typography variant="button">{props.data.skew}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">kurtosis:</Typography>
                        <Typography variant="button">{props.data.kurtosis}</Typography>
                    </div>
                </div>
            </div>         
        </div>
    ); 
}

export const MemoizedColumnGraphs = React.memo(ColumnGraphs);