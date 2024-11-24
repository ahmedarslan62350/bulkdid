import { TooltipProps } from "recharts";

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<string , string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-[130px] py-1 px-2 bg-white rounded-md shadow-xl">
        <p className="text-xs">{payload[0].name}</p>
        <div className="flex justify-between items-center">
          <div
            style={{ backgroundColor: payload[0]?.payload?.fill }}
            className={`w-3 h-3 rounded`}
          ></div>
          <p className="text-xs text-gray-600">{payload[0].value}</p>
        </div>
      </div>
    );
  }
  return null;
};
