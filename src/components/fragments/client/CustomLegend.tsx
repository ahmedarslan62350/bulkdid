import { LegendProps } from "recharts";

export const CustomLegend = (data:LegendProps) => {
  if (data) {
    return (
      <div className="w-full h-full text-center">
        <p style={{color:(data.payload && data.payload[data.legendIndex || 0].color)}}>{data.legend || (data.payload ? data.payload[data.legendIndex || 0]?.value : "")}</p>
      </div>
    );
  }
  return null;
};
