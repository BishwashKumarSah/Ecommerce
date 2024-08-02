import React, { Fragment, memo } from "react";

const Button = memo(({ className, children, onClick, disabled }) => {
  const buttonClass = `button ${className || ""}`;
  return (
    <Fragment>     
      <button className={buttonClass} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </Fragment>
  );
});

export default Button;
