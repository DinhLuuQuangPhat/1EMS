import React from "react";

const WrapperTabStrip = ({ children, DcmnCode }) => {
  return (
    <div className={DcmnCode}>
      <div className="wrapper lg:flex lg:justify-between flex-none gap-4">
        {children}
      </div>
    </div>
  );
};

export default WrapperTabStrip;
