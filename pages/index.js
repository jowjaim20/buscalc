import { useDispatch, useSelector } from "react-redux";
import Liability from "./components/Liability";

export default function Home() {
  const { liabilities } = useSelector((state) => state.liabilities);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-start h-screen text-center">
      <div className="self-center w-1/2 bg-slate-200">
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
