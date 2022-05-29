import { useState, useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "amount":
      return { ...state, amount: action.payload };
    case "expenses":
      return { ...state, expenses: action.payload };

    default:
      throw new Error();
  }
};
const expReducer = (state, action) => {
  switch (action.type) {
    case "id":
      return { ...state, id: action.payload };
    case "extitle":
      return { ...state, title: action.payload };
    case "examount":
      return { ...state, amount: action.payload };

    default:
      throw new Error();
  }
};

const Liabilities = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: "House",
    amount: 0,
    expenses: [],
  });
  const [expState, expDispatch] = useReducer(expReducer, {
    id: "",
    title: "",
    amount: 0,
  });

  useEffect(() => {
    console.log(state);
    expDispatch({
      type: "id",
      payload: Math.floor(Math.random() * 1000000),
    });
  }, [state]);
  useEffect(() => {
    dispatch({
      type: "amount",
      payload: state.expenses.reduce((acc, exp) => acc + exp.amount, 0),
    });
    console.log(state);
  }, [state.expenses]);

  return (
    <article className=" p-3 text-lg font-bold uppercase w-full bg-blue-500 text-center">
      <h2>Liabilities</h2>
      <section className="flex gap-4">
        <div className="w-1/2">
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="liName">Liability:</label>
            <h3 className="ml-1" id="liName">
              {state.title}
            </h3>

            <p>amount:{state.amount}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>expenses</h3>
          {state.expenses.map((exp) => (
            <div className="flex gap-2" key={exp.id}>
              <h4>{exp.title}</h4>
              <p>{exp.amount}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <form className="flex justify-center items-center p-3 text-lg font-bold uppercase w-full bg-blue-300 text-center">
          <div>
            <label htmlFor="title">Title</label>
            <input
              className="w-full border rounded border-slate-600"
              id="title"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "title", payload: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              className="w-full border rounded border-slate-600"
              id="amount"
              value={state.amount}
              onChange={(e) =>
                dispatch({ type: "amount", payload: e.target.value })
              }
            ></input>
          </div>
        </form>
        <h3 className="flex flex-col"></h3>

        <form
          className="flex flex-col justify-center items-center p-3 text-lg font-bold uppercase w-full bg-blue-800 text-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            dispatch({
              type: "expenses",
              payload: [...state.expenses, expState],
            });
            expDispatch({ type: "examount", payload: "" });
            expDispatch({ type: "extitle", payload: "" });
          }}
        >
          <div className="flex">
            <div className="">
              <label htmlFor="extitle">Expenses</label>
              <input
                className="w-full border rounded border-slate-600"
                id="extitle"
                value={expState.title}
                onChange={(e) =>
                  expDispatch({ type: "extitle", payload: e.target.value })
                }
                required
              ></input>
            </div>
            <div>
              <label htmlFor="examount">Amount</label>
              <input
                className="w-full border rounded border-slate-600"
                id="examount"
                value={expState.amount}
                onChange={(e) =>
                  expDispatch({ type: "examount", payload: +e.target.value })
                }
                required
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center px-6 py-1 text-white bg-green-600 rounded hover:bg-green-400"
          >
            Button
          </button>
        </form>

        <h3 className="flex flex-col">
          <p>title:{expState.title}</p>
          <p>amount:{expState.amount}</p>
        </h3>
      </section>
    </article>
  );
};

export default Liabilities;
