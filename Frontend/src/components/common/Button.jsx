import React from "react";
import "./Button.css";

const Button = ({ children, variant = "primary", full, ...rest }) => {
  return (
    <button
      className={`btn btn-${variant} ${full ? "btn-full" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
