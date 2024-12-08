import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopAssets } from "../services/api";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AssetList = () => {
  const { toast } = useToast();
  
  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    refetchInterval: 10000,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error updating prices",
          description: "Failed to fetch latest market data. Will try again soon.",
        });
      },
    },
  });

  if (isLoading) {
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
      <h1 className="text-4xl font-bold mb-8">Top 50 Cryptocurrencies</h1>
      <div className="grid gap-4">
        {assets?.map((asset: any) => (
          <Link key={asset.id} to={`/asset/${asset.id}`}>
            <div className="neo-brutalist-card p-4 hover:cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold">#{asset.rank}</span>
                  <div>
                    <h2 className="text-xl font-bold">{asset.name}</h2>
                    <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    ${Number(asset.priceUsd).toFixed(2)}
                  </p>
                  <p
                    className={`flex items-center gap-1 ${
                      Number(asset.changePercent24Hr) >= 0
                        ? "text-secondary"
                        : "text-destructive"
                    }`}
                  >
                    {Number(asset.changePercent24Hr) >= 0 ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                    {Math.abs(Number(asset.changePercent24Hr)).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};