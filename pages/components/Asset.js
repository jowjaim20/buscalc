import { useDispatch } from "react-redux";
import {
  forEditAddLiabilityExpense,
  forEditAddLiabilityId,
  forEditAddLiabilityTitle,
  forEditUpdateAmount,
} from "../features/assets/forEditSingleAssetSlice";

import {
  deleteSingleAsset,
  toggleEdit,
  deleteData,
} from "../features/assets/assetsSlice";
import Button, { RedButton } from "./Button";

const Asset = ({ asset }) => {
  const dispatch = useDispatch();

  return (
    <article className="relative p-3 text-sm font-bold text-center uppercase rounded shadow bg-slate-500 card-inset">
      <section className="flex gap-2 mt-3 ">
        <div className="w-1/2">
          <div className="flex flex-col items-start justify-start">
            <label htmlFor="liName">Asset:</label>
            <h3 className="ml-1" id="liName">
              {asset.title}
            </h3>

            <p>amount:{asset.amount}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>expenses</h3>
          {asset.expenses.map((exp) => (
            <div className="flex gap-2" key={exp.id}>
              <h4>{exp.title}</h4>
              <p>{exp.amount}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute flex items-center justify-center gap-1 top-2 right-3">
        <Button
          onClick={() => {
            dispatch(toggleEdit());
            dispatch(forEditAddLiabilityExpense(asset.expenses));
            dispatch(forEditAddLiabilityTitle(asset.title));
            dispatch(forEditAddLiabilityId(asset.id));
            dispatch(forEditUpdateAmount());
          }}
        >
          edit
        </Button>
        <RedButton
          onClick={() => {
            dispatch(deleteSingleAsset(asset.id));
            dispatch(deleteData(asset.id));
          }}
        >
          x
        </RedButton>
      </div>
    </article>
  );
};

export default Asset;
