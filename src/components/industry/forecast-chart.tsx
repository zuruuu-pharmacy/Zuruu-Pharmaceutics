"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastChartProps {
  data: {
    labels: string[];
    actual: number[];
    baseline: number[];
    optimistic: number[];
    pessimistic: number[];
  };
  scenario: '7d' | '30d' | '90d';
}

export function ForecastChart({ data, scenario }: ForecastChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Actual Demand',
        data: data.actual,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Forecast (Baseline)',
        data: data.baseline,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        fill: 'origin',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
      {
        label: 'Forecast (Optimistic)',
        data: data.optimistic,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.05)',
        fill: '-1',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
      {
        label: 'Forecast (Pessimistic)',
        data: data.pessimistic,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.05)',
        fill: '-2',
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Demand Forecast - ${scenario.toUpperCase()} Scenario`,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y) + ' units';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Units',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative h-96 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}