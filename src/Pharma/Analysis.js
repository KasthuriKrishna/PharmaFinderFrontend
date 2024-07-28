import React, { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import PharmaNav from '../Components/PharmaNav';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Analysis.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockSummary = () => {
    const chartRef = useRef(null);
    const navigate = useNavigate();
    const [value, setValue] = useState(2); // Set default value for Analytics page

    const data = {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: 'Products Sold',
                data: [65, 59, 80, 81, 56, 55, 40, 60, 80, 85, 90],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Profit Earned',
                data: [28, 48, 40, 19, 86, 27, 90, 100, 120, 130, 140],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            }
        ]
    };

    const scores = [
        { label: 'Patient Satisfaction Score', score: 80, className: '' },
        { label: 'Revenue Growth', score: 63.8, className: '' },
        { label: 'Medication Error Rate', score: 20.5, className: 'warning' },
        { label: 'Inventory Turnover Ratio', score: 70.0, className: 'great' }
    ];

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            const handleClick = (event) => {
                const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

                if (points.length) {
                    const firstPoint = points[0];
                    const label = chart.data.labels[firstPoint.index];
                    const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

                    alert(`Year: ${label}, Value: ${value}`);
                }
            };

            if (chart.canvas) {
                chart.canvas.onclick = handleClick;
            }

            return () => {
                if (chart.canvas) {
                    chart.canvas.onclick = null;
                }
            };
        }
        scores.forEach((scoreItem) => {
            const progressBar = document.querySelector(`.progress-bar[data-label="${scoreItem.label}"]`);
            if (progressBar) {
                progressBar.style.setProperty('--score', scoreItem.score);
                progressBar.querySelector('.progress-fill').style.width = `${scoreItem.score}%`;
            }
        });
    }, [chartRef]);

    const handleChange = (newValue, path) => {
        setValue(newValue);
        navigate(path);
    };

    return (
        <div className='analysis-body'>
            <Header />
            <PharmaNav value={value} handleChange={handleChange} />
            <div className="analysis-container">
                <div className="header">
                    <h1 style={{color:"white"}}>Pharmacy One</h1>
                </div>
                <div className="content">
                    <div className="chart-container">
                        <Line
                            ref={(ref) => {
                                if (ref) {
                                    chartRef.current = ref.chartInstance;
                                }
                            }}
                            data={data}
                            options={{
                                responsive: true,
                                plugins: {
                                    tooltip: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                },
                                hover: {
                                    mode: 'nearest',
                                    intersect: true,
                                },
                            }}
                        />
                    </div>
                    <div className="summary">
                        {scores.map((scoreItem) => (
                            <div key={scoreItem.label} className="summary-item">
                                <h2>{scoreItem.label}</h2>
                                <div className={`progress-bar ${scoreItem.className}`} data-label={scoreItem.label}>
                                    <div className="progress-fill"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockSummary;
