import React from "react";

export default ({ handleClick }) => {
  const elements = ["Name", "Type", "Brand"];
  return (
    <div className="listContainer">
      <ul className="listOfProductBtn">
        {elements.map((item, key) => (
          <li key={key} onClick={e => handleClick(e)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
