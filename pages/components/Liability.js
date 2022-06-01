import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LiabilityTotalExpenses,
  removeExpenses,
} from "../features/liabilities/liabilitiesSlice";

const Liability = ({ liability, edit }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LiabilityTotalExpenses(liability.expenses));
    console.log("useEffect");
  }, [liability, dispatch]);
  return (
    <article className="shadow sha rounded p-3 text-lg font-bold uppercase w-full bg-blue-500 text-center">
      <section className="flex gap-4">
        <div className="w-1/2">
          <div className="flex flex-col justify-start items-start">
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
                className={`flex justify-center items-center px-6 py-1 text-white ${
                  edit ? "bg-red-600" : "bg-yellow-400"
                } rounded ${edit ? "hover:bg-red-400" : "hover:bg-yellow-300"} 
            } rounded ${edit ? "" : "hidden"} `}
                onClick={() =>
                  dispatch(removeExpenses({ id1: exp.id, id2: liability.id }))
                }
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Liability;
