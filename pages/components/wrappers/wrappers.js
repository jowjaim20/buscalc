import Link from "next/link";
import React from "react";

export const ListLinkWrapper = ({ children, href = "/" }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};
export const HomepageCardWrapper = ({ data }) => {
  return (
    <div>
      <section className="flex">
        <h3 className="mr-1">{data.title}:</h3>
        <p>{data.amount}</p>
      </section>
    </div>
  );
};

export const CardWrapper = ({ children }) => {
  return (
    <div className="flex flex-col self-end w-1/2 p-1 m-1 rounded-md shadow-md bg-slate-200">
      {children}
    </div>
  );
};
