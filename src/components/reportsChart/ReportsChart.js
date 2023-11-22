import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const BarsChart = ({ reportsData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (reportsData.length > 0) {
      const ctx = document.getElementById("myChart");

      if (chart) {
        chart.destroy();
      }

      if (ctx) {
        const registroTypes = ["Ingreso", "Salida", "Fuera de horario"];

        const registrosCount = registroTypes.map((type) => {
          const count = reportsData.filter(
            (registro) => registro.tipo === type
          ).length;
          return count;
        });

        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: registroTypes,
            datasets: [
              {
                label: "Número de Registros",
                data: registrosCount,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        setChart(myChart);
      }
    }
  }, [reportsData]);

  return <canvas id="myChart" width="5" height="5"></canvas>;
};

export default BarsChart;
