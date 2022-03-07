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
import { Bar, Doughnut } from 'react-chartjs-2';

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

export default function VariableGraph(props){
    return(
        <div>
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
    )
}