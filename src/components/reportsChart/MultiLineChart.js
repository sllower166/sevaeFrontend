import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const MultiLineChart = ({ data }) => {
  const chartContainer = useRef(null);
  const lineChart = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      const transformedData = {};
      data.forEach((registro) => {
        const { fecha, tipo } = registro;
        if (!transformedData[tipo]) {
          transformedData[tipo] = [];
        }
        transformedData[tipo].push({
          x: new Date(fecha),
          y: Math.random() * 10,
        });
      });

      const chartData = Object.keys(transformedData).map((tipo, index) => ({
        label: tipo,
        data: transformedData[tipo],
        backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        },0.2)`,
        borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        },1)`,
        borderWidth: 1,
        fill: false,
      }));

      lineChart.current = new Chart(ctx, {
        type: "line",
        data: {
          datasets: chartData.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: `rgba(${Math.random() * 255},${
              Math.random() * 255
            },${Math.random() * 255},0.2)`,
            borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
              Math.random() * 255
            },1)`,
            borderWidth: 1,
            fill: false,
          })),
        },
        options: {
          scales: {
            x: {
              type: "time",
              title: {
                display: true,
                text: "Tiempo",
              },
            },
            y: {
              title: {
                display: true,
                text: "Valores Y",
              },
            },
          },
        },
      });
    }

    return () => {
      if (lineChart.current) {
        lineChart.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default MultiLineChart;
