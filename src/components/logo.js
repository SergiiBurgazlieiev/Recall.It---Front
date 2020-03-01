import React from "react";
import icon from "../assets/images/extension_icon.png";

export default ({ showResults }) => (
  <div>
    <div className="logo">
      <img src={icon} alt="icon" onClick={() => showResults()} />
    </div>
  </div>
);
