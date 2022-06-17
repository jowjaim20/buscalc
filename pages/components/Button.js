import React from "react";

const Button = ({ children, type = "button", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="flex items-center justify-center px-6 py-1 text-white rounded bg-lime-600 hover:bg-lime-400"
    >
      {children}
    </button>
  );
};
const RedButton = ({ children, type = "button", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="flex items-center justify-center px-6 py-1 text-white rounded hover:bg-amber-400 bg-amber-600"
    >
      {children}
    </button>
  );
};
export { RedButton };

export default Button;
