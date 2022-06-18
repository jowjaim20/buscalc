import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return <div>
      <Header/>
      {children}
      <Navigation/>
      </div>;
};

export default Layout;
