import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import Authentication from "./components/Authentication";

import {
  fetchExpenses,
  setUser,
} from "./features/liabilities/liabilitiesSlice";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { useMemo } from "react";

export default function Home() {
  const { user, liabilities } = useSelector((state) => state.liabilities);
  const dispatch = useDispatch();

  const auth = getAuth();
  const userSignOut = async () => {
    try {
      await signOut(auth).then(() => console.log("signOut"));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex flex-col justify-start mb-auto text-center">
      {!user ? <Authentication /> : <HomePage />}
      <button
        onClick={() => {
          userSignOut();
          dispatch(setUser(null));
        }}
        type="button"
        className="text-black rounded-md bg-rose-500"
      >
        logout
      </button>
    </main>
  );
}
