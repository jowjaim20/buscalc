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
    <div className=" ml-3">
      <section className="flex text-white">
        <h3 className="mr-1">{data.title}:</h3>
        <p>{data.amount}</p>
      </section>
    </div>
  );
};

export const CardWrapper = ({ children }) => {
  return (
    <div className="card p-2">
      {children}
    </div>
  );
};
