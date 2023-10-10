import React, { useRef, useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ReferenceLine,
  Cell,
} from "recharts";

function MyBarChart(props) {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const { dataObject, title } = props;

  useEffect(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setChartHeight(0.8 * containerRef.current.offsetHeight);
    }
  }, []);
  let data = [];
  if (props.isProjected) {
    data = Object.entries(dataObject).map(([month, value]) => ({
      month,
      value,
    }));
  } else {
    data = Object.entries(dataObject)
      .map(([month, value]) => ({ month, value }))
      .reverse();
  }

  const renderLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#768D99"
        fontSize="12"
        dy={-6}
        textAnchor="middle"
      >
        {value.toLocaleString("pt-br")}
      </text>
    );
  };

  return (
    <div ref={containerRef} className="graphic__bar">
      <h3 className="graphic__title">{title}</h3>
      <BarChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <ReferenceLine y={0} stroke="#768D99" strokeWidth={2} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: "14px", fill: "#333" }}
        />
        <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        <Tooltip />
        <Bar dataKey="value">
          <LabelList dataKey="value" content={renderLabel} position="top" />
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value < 0 || title == "Custo" ? "#AA3C39" : "#6D9B12"}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default MyBarChart;
