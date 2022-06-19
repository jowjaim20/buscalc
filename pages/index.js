import { useSelector } from "react-redux";
import HomePageAsset from "./components/HomePageAsset";
import HomePageLiability from "./components/HomePageLiability";
import { getAssets } from "./features/liabilities/assets/assetsSlice";

export default function Home() {
  const { liabilities } = useSelector((state) => state.liabilities);
  const  assets  = useSelector(getAssets) ;
  return (
    <div className="flex flex-col justify-start h-screen text-center">
      <div className="m-1 p-1 self-end w-1/2 bg-slate-200 rounded-md shadow-md">
        <h2 className="mb-2 uppercase font-semibold">Liabilities</h2>
        <div>
          {liabilities.map((liability) => (
            <HomePageLiability key={liability.id} liability={liability} />
          ))}
        </div>
      </div>
      <div className="m-1 p-1 self-end w-1/2 bg-slate-200 rounded-md shadow-md">
        <h2 className="mb-2 uppercase font-semibold">Assets</h2>
        <div>
          {assets.map((singleAsset) => (
            <HomePageAsset key={singleAsset.id} asset={singleAsset} />
          ))}
        </div>
      </div>
    </div>
  );
}
