import { useDispatch } from "react-redux";
import {
  forEditAddLiabilityExpense,
  forEditAddLiabilityId,
  forEditAddLiabilityTitle,
  forEditUpdateAmount,
} from "../features/liabilities/forEditLiabilitySlice";

import {
  deleteLiability,
  toggleEdit,
  deleteData,
} from "../features/liabilities/liabilitiesSlice";
import Button, { RedButton } from "./Button";

const Liability = ({ liability }) => {
  const dispatch = useDispatch();

  return (
    <article className="relative p-3 text-sm font-bold text-center uppercase rounded shadow bg-slate-500 card-inset">
      <section className="flex gap-2 mt-3">
        <div className="flex items-center justify-center w-1/2 gap-3">
          <h3
            className="ml-1 font-serif text-2xl font-bold text-white "
            id="liName"
          >
            {liability.title}
          </h3>
        </div>
        <div className="flex flex-col">
          <h3>expenses</h3>
          {liability.expenses.map((exp) => (
            <div className="flex gap-2" key={exp.id}>
              <h4>{exp.title}</h4>
              <p>{exp.amount}</p>
            </div>
          ))}
          <p className="text-gray-300 ">total:{liability.amount}</p>
        </div>
      </section>
      <div className="absolute flex items-center justify-center gap-1 top-2 right-3">
        <Button
          onClick={() => {
            dispatch(toggleEdit());
            dispatch(forEditAddLiabilityExpense(liability.expenses));
            dispatch(forEditAddLiabilityTitle(liability.title));
            dispatch(forEditAddLiabilityId(liability.id));
            dispatch(forEditUpdateAmount());
          }}
        >
          edit
        </Button>
        <RedButton
          onClick={() => {
            dispatch(deleteLiability(liability.id));
            dispatch(deleteData(liability.id));
          }}
        >
          x
        </RedButton>
      </div>
    </article>
  );
};

export default Liability;
