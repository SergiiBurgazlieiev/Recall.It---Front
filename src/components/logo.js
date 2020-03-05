import React from "react";

export default ({ showResults }) => (
  <div>
    <div className="logo">
      <div className="icon" onClick={() => showResults()}></div>
  </div>
);
