import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpenseTitle,
  addExpenseAmount,
  addExpenses,
  addLiabilityTitle,
  addLiability,
  setEdit,
} from "../features/liabilities/liabilitiesSlice";

const Modal = () => {
  const { liability, expense, edit } = useSelector(
    (state) => state.liabilities
  );
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-center items-center ">
      <div
        className=" w-full h-screen absolute bg-slate-900 bg-opacity-25 -10"
        onClick={() => dispatch(setEdit())}
      ></div>
      <div className="flex justify-center items-center w-4/6 absolute inset-y-64 z-30">
        <div className="shadow-md shadow-slate-900 ">
          <article className="p-3 text-lg font-bold uppercase w-full bg-blue-500 text-center">
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
                      } rounded ${
                        edit ? "hover:bg-red-400" : "hover:bg-yellow-300"
                      } 
              } rounded ${edit ? "" : "hidden"} `}
                      onClick={() =>
                        dispatch(
                          removeExpenses({ id1: exp.id, id2: liability.id })
                        )
                      }
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </article>
          <section>
            <div className="flex justify-center items-center p-3 text-lg font-bold uppercase w-full bg-blue-300 text-center">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  className="w-full border rounded border-slate-600"
                  id="title"
                  value={liability.title}
                  onChange={(e) => dispatch(addLiabilityTitle(e.target.value))}
                ></input>
              </div>
            </div>
            <h3 className="flex flex-col"></h3>

            <form
              className="flex flex-col justify-center items-center p-3 text-lg font-bold uppercase w-full bg-blue-800 text-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addExpenses());
              }}
            >
              <div className="flex">
                <div className="">
                  <label className="text-white" htmlFor="extitle">
                    Expense Name
                  </label>
                  <input
                    className="w-full border rounded border-slate-600"
                    id="extitle"
                    value={expense.title}
                    onChange={(e) => dispatch(addExpenseTitle(e.target.value))}
                    required
                  ></input>
                </div>
                <div>
                  <label className="text-white" htmlFor="examount">
                    Amount
                  </label>
                  <input
                    className="w-full border rounded border-slate-600"
                    id="examount"
                    value={expense.amount}
                    onChange={(e) =>
                      dispatch(addExpenseAmount(+e.target.value))
                    }
                    required
                  ></input>
                </div>
              </div>

              <button
                type="submit"
                className="flex justify-center items-center px-6 py-1 text-white bg-green-600 rounded hover:bg-green-400"
              >
                Add Expense
              </button>
              <button
                onClick={() => {
                  dispatch(addLiability());
                  dispatch(setEdit());
                }}
                type="button"
                className="flex justify-center items-center px-6 py-1 text-white bg-green-600 rounded hover:bg-green-400"
              >
                Add Liability
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
