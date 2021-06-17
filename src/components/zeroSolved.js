import React from "react";

const Error = (props) => {
  const { handle } = { ...props };
  return (
    <div className="error">
      <p>{handle} did not solved a single problem :( </p>
    </div>
  );
};

export default Error;
