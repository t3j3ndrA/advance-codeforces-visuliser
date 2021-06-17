import React from "react";

const Error = (props) => {
  const { handle } = { ...props };
  return (
    <div className="error">
      <p>Could not found a Handle - {handle}. Please enter a VALID handle</p>
    </div>
  );
};

export default Error;
