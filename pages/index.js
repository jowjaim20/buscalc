import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Liability from "./components/Liability";
import { fetchData } from "./features/liabilities/liabilitiesSlice";

export default function Home() {
  const { liabilities, status } = useSelector((state) => state.liabilities);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-start h-screen text-center">
      <div className="w-1/2 self-center bg-slate-200">
        <h2>Liabilities</h2>
        <div>
          {liabilities.map((liability) => (
            <Liability key={liability.id} liability={liability} />
          ))}
        </div>
      </div>
    </div>
  );
}
