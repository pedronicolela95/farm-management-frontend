import React, { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function MyPieChart(props) {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const { dataObject, title } = props;

  const COLORS = [
    "#6D9B12", // Verde Claro (Plantas)
    "#3E721D", // Verde Escuro (Folhas)
    "#A57939", // Marrom (Terra)
    "#D9A25F", // Amarelo Terroso (Grãos)
    "#8C6239", // Marrom Escuro (Madeira)
    "#F2F27A", // Amarelo Claro (Milho)
    "#AA3C39", // Vermelho Escuro (Celeiro)
    "#768D99", // Azul Acinzentado (Céu Chuvoso)
    "#D9CB9E", // Bege (Palha)
    "#6A3200", // Marrom Profundo (Solo Fértil)
  ];

  useEffect(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current.offsetWidth);
      setChartHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const data = Object.entries(dataObject)
    .map(([name, value]) => ({ name, value }))
    .reverse();

  return (
    <div ref={containerRef} className="graphic__pie">
      <h3 className="graphic__title">{title}</h3>
      {data.length === 0 ? (
        <h3 className="graphic__error">Sem dados</h3>
      ) : (
        <PieChart width={chartWidth} height={chartHeight}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={chartWidth / 2}
            cy={chartHeight / 2}
            outerRadius={Math.min(chartWidth, chartHeight) * 0.4}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}

export default MyPieChart;
