import { ArrowDown, ArrowUp } from "lucide-react";
import { CryptoChart } from "./CryptoChart";

interface CompareAssetCardProps {
  asset: any;
  history: any[];
}

export const CompareAssetCard = ({ asset, history }: CompareAssetCardProps) => {
  if (!asset) return null;

  return (
    <div className="neo-brutalist-card p-4 mt-4">
      <h2 className="text-2xl font-bold">{asset.name}</h2>
      <p className="text-xl">${Number(asset.priceUsd).toFixed(2)}</p>
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
      <CryptoChart data={history} />
    </div>
  );
};