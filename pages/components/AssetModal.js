import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addLiabilityTitle,
  addLiabilityExpense,
  removeExpenseModal,
  clearLiability,
  updateAmount,
} from "../features/assets/singleAssetSlice";
import {
  addData,
  addSingleAsset,
  toggleAddAsset,
} from "../features/assets/assetsSlice";
import {
  addExpenseTitle,
  addExpenseAmount,
  clearExpense,
} from "../features/liabilities/expenseSlice";
import Button, { RedButton } from "./Button";

const AssetModal = () => {
  const { singleAsset } = useSelector((state) => state.singleAsset);
  const { expense } = useSelector((state) => state.expense);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="absolute w-full h-screen bg-opacity-25 bg-slate-900 -10"
        onClick={() => dispatch(toggleAddAsset())}
      ></div>
      <div className="absolute z-30 flex items-center justify-center w-4/6 inset-y-64">
        <div className="shadow-md shadow-slate-900">
          <article className="w-full p-3 text-lg font-bold text-center uppercase bg-slate-500">
            <section className="flex gap-4">
              <div className="w-1/2">
                <div className="flex flex-col items-start justify-start">
                  <p>amount:{singleAsset.amount}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <h3>Asset expense</h3>
                {singleAsset.expenses.map((exp) => (
                  <div className="flex gap-2" key={exp.id}>
                    <h4>{exp.title}</h4>
                    <p>{exp.amount}</p>
                    <RedButton
                      onClick={() => {
                        dispatch(removeExpenseModal(exp.id));
                        dispatch(updateAmount());
                      }}
                    >
                      delete
                    </RedButton>
                  </div>
                ))}
              </div>
            </section>
          </article>
          <section>
            <div className="flex items-center justify-center w-full p-3 text-lg font-bold text-center uppercase bg-slate-300">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  className="w-full border rounded border-slate-600"
                  id="title"
                  value={singleAsset.title}
                  onChange={(e) => dispatch(addLiabilityTitle(e.target.value))}
                ></input>
              </div>
            </div>

            <form
              className="flex flex-col items-center justify-center w-full gap-4 p-3 text-lg font-bold text-center uppercase bg-slate-800"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addLiabilityExpense(expense));
                dispatch(updateAmount());
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
                    className="w-full border border-indigo-400 rounded"
                    id="examount"
                    value={expense.amount}
                    onChange={(e) =>
                      dispatch(addExpenseAmount(+e.target.value))
                    }
                    required
                  ></input>
                </div>
              </div>
              <Button type="submit">Add Expense</Button>
              <Button
                onClick={() => {
                  dispatch(addSingleAsset(singleAsset));
                  dispatch(addData(singleAsset));
                  dispatch(clearLiability(singleAsset));
                  dispatch(toggleAddAsset());
                }}
              >
                Add Liability
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;
