import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  toggleEdit,
  UpdateLiability,
} from "../features/liabilities/liabilitiesSlice";
import {
  addExpenseTitle,
  addExpenseAmount,
  clearExpense,
} from "../features/liabilities/expenseSlice";
import {
  forEditAddLiabilityTitle,
  forEditClearLiability,
  forEditPushLiabilityExpense,
  forEditRemoveExpenseModal,
  forEditUpdateAmount,
} from "../features/liabilities/forEditLiabilitySlice";

const ForEditModal = () => {
  const { forEditLiability } = useSelector((state) => state.forEditLiability);
  const { edit } = useSelector((state) => state.liabilities);
  const { expense } = useSelector((state) => state.expense);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center w-full ">
      <div
        className="absolute w-full h-screen bg-opacity-25 bg-slate-900 -10"
        onClick={() => dispatch(toggleEdit())}
      ></div>
      <div className="absolute z-30 flex items-center justify-center w-4/6 inset-y-64">
        <div className="shadow-md shadow-slate-900 ">
          <article className="w-full p-3 text-lg font-bold text-center uppercase bg-green-500">
            <section className="flex gap-4">
              <div className="w-1/2">
                <div className="flex flex-col items-start justify-start">
                  <p>amount:{forEditLiability.amount}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <h3>expenses</h3>
                {forEditLiability.expenses.map((exp) => (
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
                      onClick={() => {
                        dispatch(forEditRemoveExpenseModal(exp.id));
                        dispatch(forEditUpdateAmount());
                      }}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </article>
          <section>
            <div className="flex items-center justify-center w-full p-3 text-lg font-bold text-center uppercase bg-green-300">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  className="w-full border rounded border-slate-600"
                  id="title"
                  value={forEditLiability.title}
                  onChange={(e) =>
                    dispatch(forEditAddLiabilityTitle(e.target.value))
                  }
                ></input>
              </div>
            </div>
            <h3 className="flex flex-col"></h3>

            <form
              className="flex flex-col items-center justify-center w-full gap-4 p-3 text-lg font-bold text-center uppercase bg-green-800"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(forEditPushLiabilityExpense(expense));
                dispatch(forEditUpdateAmount());
                dispatch(clearExpense());
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
                className="flex items-center justify-center px-6 py-1 text-white bg-green-600 rounded hover:bg-green-400"
              >
                Add Expense
              </button>
              <button
                onClick={() => {
                  dispatch(UpdateLiability(forEditLiability));
                  dispatch(forEditClearLiability());
                  dispatch(toggleEdit());
                }}
                type="button"
                className="flex items-center justify-center px-6 py-1 text-white bg-green-600 rounded hover:bg-green-400"
              >
                Save
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ForEditModal;
