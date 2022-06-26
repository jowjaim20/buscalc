import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import {
  fetchData,
  fetchExpenses,
  setUser,
} from "../features/liabilities/liabilitiesSlice";

const auth = getAuth();
const db = getFirestore();

const Authentication = () => {
  const { liabilities, user } = useSelector((state) => state.liabilities);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logUsername, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const CreateUser = async (username, password) => {
    try {
      await createUserWithEmailAndPassword(auth, username, password).then(
        (cred) => {
          setDoc(doc(db, "users", cred.user.uid), {});
          dispatch(setUser(cred.user.uid));
          dispatch(fetchData(cred.user.uid));
          // fetchAllExpenses(cred.user.uid, liabilities);
          setPassword("");
          setUsername("");
        }
      );
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  const fetchAllExpenses = (id, liabilities) => {
    console.log("fetchExp", id, liabilities);
    setTimeout(() => {
      liabilities.forEach((li) => {
        dispatch(fetchExpenses({ id: id, liId: li.id }));
      });
    }, 10);
  };
  const userSignIn = async (username, password) => {
    try {
      await signInWithEmailAndPassword(auth, username, password).then(
        (cred) => {
          setError("signin");
          dispatch(fetchData(cred.user.uid));
          dispatch(setUser(cred.user.uid));
        }
      );
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-start mb-auto text-center">
      <form
        className="flex flex-col text-green-300"
        onSubmit={(e) => {
          e.preventDefault();
          CreateUser(username, password);
        }}
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="text-black rounded-md bg-slate-100">
          signup
        </button>
      </form>
      <form
        className="flex flex-col text-blue-300"
        onSubmit={(e) => {
          e.preventDefault();
          userSignIn(logUsername, logPassword);
        }}
      >
        <label htmlFor="logUsername">Username</label>
        <input
          type="text"
          id="logUsername"
          value={logUsername}
          onChange={(e) => setLogUsername(e.target.value)}
        />
        <label htmlFor="logPassword">Password</label>
        <input
          value={logPassword}
          type="logPassword"
          id="logPassword"
          onChange={(e) => setLogPassword(e.target.value)}
        />

        <button type="submit" className="text-black rounded-md bg-slate-100">
          login
        </button>
      </form>
      <div>
        <h1 className="text-red-500">{error}</h1>
      </div>
    </div>
  );
};

export default Authentication;
