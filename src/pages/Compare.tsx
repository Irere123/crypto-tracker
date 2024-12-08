import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopAssets, getAssetDetails, getAssetHistory } from "../services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompareAssetCard } from "@/components/CompareAssetCard";

const Compare = () => {
  const [asset1, setAsset1] = useState<string>("");
  const [asset2, setAsset2] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    refetchInterval: 10000,
  });

  const { data: asset1Data } = useQuery({
    queryKey: ["asset", asset1],
    queryFn: () => getAssetDetails(asset1),
    enabled: !!asset1 && mounted,
    refetchInterval: 10000,
  });

  const { data: asset2Data } = useQuery({
    queryKey: ["asset", asset2],
    queryFn: () => getAssetDetails(asset2),
    enabled: !!asset2 && mounted,
    refetchInterval: 10000,
  });

  const { data: asset1History } = useQuery({
    queryKey: ["history", asset1],
    queryFn: () => getAssetHistory(asset1),
    enabled: !!asset1 && mounted,
    refetchInterval: 10000,
  });

  const { data: asset2History } = useQuery({
    queryKey: ["history", asset2],
    queryFn: () => getAssetHistory(asset2),
    enabled: !!asset2 && mounted,
    refetchInterval: 10000,
  });

  if (!mounted) return null;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Compare Cryptocurrencies</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Select value={asset1} onValueChange={setAsset1}>
            <SelectTrigger className="neo-brutalist-button w-full">
              <SelectValue placeholder="Select first asset" />
            </SelectTrigger>
            <SelectContent>
              {assets?.map((asset: any) => (
                <SelectItem key={asset.id} value={asset.id}>
                  {asset.name} ({asset.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {asset1Data && <CompareAssetCard asset={asset1Data} history={asset1History || []} />}
        </div>

        <div>
          <Select value={asset2} onValueChange={setAsset2}>
            <SelectTrigger className="neo-brutalist-button w-full">
              <SelectValue placeholder="Select second asset" />
            </SelectTrigger>
            <SelectContent>
              {assets?.map((asset: any) => (
                <SelectItem key={asset.id} value={asset.id}>
                  {asset.name} ({asset.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {asset2Data && <CompareAssetCard asset={asset2Data} history={asset2History || []} />}
        </div>
      </div>
    </div>
  );
};

export default Compare;