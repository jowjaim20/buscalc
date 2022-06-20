import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
