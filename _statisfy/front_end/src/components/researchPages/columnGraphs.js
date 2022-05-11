import "../../StyleSheets/NewCSSFiles/researchFolder/dataColumns.css"

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
            <div className="DataColumns">
                <h6 className="DataColumnsText_title">
                    {props.data.column}
                </h6>
                <Divider/>
                <div className="DataColumns_graph">
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

                <div className="DataColumns_details">
                    {!matches? 
                        <Divider/> : null
                    }
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Mean: </p>
                        <p className="DataColumnsText_content">{props.data.mean}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Normality: </p>
                        <p className="DataColumnsText_content">{props.data.distribution}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Median: </p>
                        <p className="DataColumnsText_content">{props.data.median}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Min: </p>
                        <p className="DataColumnsText_content">{props.data.min}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Max: </p>
                        <p className="DataColumnsText_content">{props.data.max}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">STD.DEV: </p>
                        <p className="DataColumnsText_content">{props.data.std}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Outliers: </p>
                        <p className="DataColumnsText_content">{props.data.outliers}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Null Count: </p>
                        <p className="DataColumnsText_content" style={{'color': (props.data.null_count / props.size) * 100 > 60 ? "red" : "green"}}>{props.data.null_count}  •{((props.data.null_count / props.size) * 100).toFixed(2)}% </p>
                        
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Skew</p>
                        <p className="DataColumnsText_content">{props.data.skew}</p>
                    </div>
                    <div className="DataColumns_details_row">
                        <p className="DataColumnsText_content">Kurtosis: </p>
                        <p className="DataColumnsText_content">{props.data.kurtosis}</p>
                    </div>
                </div>
            </div>


            

                
            </div>     
    ); 
}

export const MemoizedColumnGraphs = React.memo(ColumnGraphs);