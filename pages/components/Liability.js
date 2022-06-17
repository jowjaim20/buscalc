import { useDispatch } from "react-redux";
import {
  forEditAddLiabilityExpense,
  forEditAddLiabilityId,
  forEditAddLiabilityTitle,
  forEditUpdateAmount,
} from "../features/liabilities/forEditLiabilitySlice";

import {
  removeLiabilityExpense,
  deleteLiability,
  toggleEdit,
} from "../features/liabilities/liabilitiesSlice";
import Button, { RedButton } from "./Button";

const Liability = ({ liability }) => {
  const dispatch = useDispatch();

  return (
    <article className="relative p-3 text-lg font-bold text-center uppercase bg-blue-500 rounded shadow sha">
      <section className="flex gap-4 p-5">
        <div className="w-1/2">
          <div className="flex flex-col items-start justify-start">
            <label htmlFor="liName">Liability:</label>
            <h3 className="ml-1" id="liName">
              {liability.title}
            </h3>

            <p>amount:{liability.amount}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>expenses</h3>
          {liability.expenses.map((exp) => (
            <div className="flex gap-2" key={exp.id}>
              <h4>{exp.title}</h4>
              <p>{exp.amount}</p>
              <RedButton
                onClick={() =>
                  dispatch(
                    removeLiabilityExpense({ id1: exp.id, id2: liability.id })
                  )
                }
              >
                delete
              </RedButton>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute top-0 flex items-center justify-center gap-1 right-3">
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
        <RedButton onClick={() => dispatch(deleteLiability(liability.id))}>
          x
        </RedButton>
      </div>
    </article>
  );
};

export default Liability;
