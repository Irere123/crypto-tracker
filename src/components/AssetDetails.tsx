import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssetDetails, getAssetHistory } from "../services/api";
import { ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AssetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: asset } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAssetDetails(id!),
    refetchInterval: 10000,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error updating price",
          description: "Failed to fetch latest price data. Will try again soon.",
        });
      },
      onSuccess: (newData: any, oldData: any) => {
        if (oldData && newData.priceUsd !== oldData.priceUsd) {
          const priceChange = Number(newData.priceUsd) - Number(oldData.priceUsd);
          const isIncrease = priceChange > 0;
          toast({
            title: `Price ${isIncrease ? "increased" : "decreased"}`,
            description: `${asset?.symbol} is now $${Number(newData.priceUsd).toFixed(2)}`,
            variant: isIncrease ? "default" : "destructive",
          });
        }
      },
    },
  });

  const { data: history } = useQuery({
    queryKey: ["history", id],
    queryFn: () => getAssetHistory(id!),
    refetchInterval: 10000,
  });

  if (!asset) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="neo-brutalist-card p-8">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Link to="/" className="neo-brutalist-button inline-block mb-8">
        <div className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Back
        </div>
      </Link>

      <div className="grid gap-8">
        <div className="neo-brutalist-card p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{asset.name}</h1>
              <p className="text-xl text-muted-foreground">{asset.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">
                ${Number(asset.priceUsd).toFixed(2)}
              </p>
              <p
                className={`flex items-center gap-1 justify-end text-xl ${
                  Number(asset.changePercent24Hr) >= 0
                    ? "text-secondary"
                    : "text-destructive"
                }`}
              >
                {Number(asset.changePercent24Hr) >= 0 ? (
                  <ArrowUp size={24} />
                ) : (
                  <ArrowDown size={24} />
                )}
                {Math.abs(Number(asset.changePercent24Hr)).toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="h-[400px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="neo-brutalist-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-bold">
                ${Number(asset.marketCapUsd / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div className="neo-brutalist-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Volume (24h)</p>
              <p className="text-xl font-bold">
                ${Number(asset.volumeUsd24Hr / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="neo-brutalist-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Supply</p>
              <p className="text-xl font-bold">
                {Number(asset.supply / 1000000).toFixed(2)}M {asset.symbol}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};