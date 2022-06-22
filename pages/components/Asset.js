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
    <article className=" card-inset text-sm relative p-3 font-bold text-center uppercase bg-blue-500 rounded shadow">
      <section className="flex gap-4 ">
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
      <div className="absolute top-0 flex items-center justify-center gap-1 right-3">
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
