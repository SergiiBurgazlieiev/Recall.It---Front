import React from "react";

export default ({ handleClick, prdLinks }) => {
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
