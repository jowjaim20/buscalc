import { useDispatch, useSelector } from "react-redux";
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
              <button
                className={`flex justify-center items-center px-6 py-1 text-white bg-red-600
             rounded `}
                onClick={() =>
                  dispatch(
                    removeLiabilityExpense({ id1: exp.id, id2: liability.id })
                  )
                }
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute top-0 flex items-center justify-center gap-1 right-3">
        <button
          onClick={() => {
            dispatch(toggleEdit());
            dispatch(forEditAddLiabilityExpense(liability.expenses));
            dispatch(forEditAddLiabilityTitle(liability.title));
            dispatch(forEditAddLiabilityId(liability.id));
            dispatch(forEditUpdateAmount());
          }}
          className="px-4 py-1 text-center bg-green-300 rounded"
        >
          edit
        </button>
        <button
          onClick={() => dispatch(deleteLiability(liability.id))}
          className="px-2 py-1 text-center bg-red-500 rounded"
        >
          x
        </button>
      </div>
    </article>
  );
};

export default Liability;
