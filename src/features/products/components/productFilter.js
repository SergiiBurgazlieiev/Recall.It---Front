import React from "react";

export default ({ handleClick, prdLinks }) => {
  const elements = ["Product", "Category", "Manufacturer"];
  console.log(prdLinks[0]);
  console.log(elements);
  return (
    <div className="listContainer">
      <ul className="listOfProductBtn">
        {prdLinks[0].map((item, key) => (
          <li key={key} onClick={e => handleClick(e)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
