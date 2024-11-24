import { LegendProps } from "recharts";


interface CustomLegendProps extends LegendProps {
  legendIndex?: number;  
  legend?: string; 
}

export const CustomLegend = (data:CustomLegendProps) => {
  if (data) {
    return (
      <div className="w-full h-full text-center">
        <p style={{color:(data.payload && data.payload[data.legendIndex || 0].color)}}>{data.legend || (data.payload ? data.payload[data.legendIndex || 0]?.value : "")}</p>
      </div>
    );
  }
  return null;
};
