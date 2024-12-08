import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CryptoChartProps {
  data: any[];
}

export const CryptoChart = ({ data }: CryptoChartProps) => {
  if (!data?.length) return null;

  return (
    <div className="h-[200px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
          />
          <Tooltip
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`]}
            labelFormatter={(label) =>
              new Date(label).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          <Line
            type="monotone"
            dataKey="priceUsd"
            stroke="#000000"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};