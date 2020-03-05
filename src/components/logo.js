import React from "react";


export default ({ showResults, icon }) => (
  <div>
    <div className="logo">
      <img src={icon} alt="icon" onClick={() => showResults()} />
  	</div>
  </div>
);
