"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "../fragments/client/CustomToolTop";
import { CustomLegend } from "../fragments/client/CustomLegend";

const DonutChart = ({
  width = 100,
  height = 100,
  className = "",
  colors = ["green", "#e0553d"],
  title = "CPU Usage",
  isLegend = true,
  legendName = "",
  legendIndex = 0,
  legendClassName = "",
  data = [{}]
}) => {


  return (
    <>
      <div className="w-fit h-fit">
        <p className="h-fit w-full font-bold text-center text-gray-600">
          {title}
        </p>
        <PieChart width={width} height={height} className={className}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={height / 5}
            outerRadius={height / 5 + 20}
            fill="#8884d8"
            paddingAngle={0}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {isLegend ? (
            <Legend
              content={
                <CustomLegend
                  legend={legendName}
                  legendIndex={legendIndex}
                  className={`${legendClassName}`}
                />
              }
            />
          ) : null}
        </PieChart>
      </div>
    </>
  );
};

export default DonutChart;
