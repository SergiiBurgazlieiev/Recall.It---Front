import React from "react";
import get from "lodash/get";

export default ({ resultsOff, ...props }) => {
  const elements = [
    {
      name: "Name",
      propsName: "productsByNameNumber",
      by: "name"
    },
    {
      name: "Type",
      propsName: "productsByTypeNumber",
      by: "type"
    },
    {
      name: "Brand",
      propsName: "productsByManufacturerNumber",
      by: "manufacturer"
    }
  ];
  console.log("elements")
  console.log(get(props, elements[0].propsName, ""))
  return (
    <div>
      <div className="resultWindow">
        <div>
          <h3>Recall.it</h3>
        </div>
        {elements.map((item, key) => {
          return  <p
            key={key}
            data-value={item.name}
            onClick={e => resultsOff(e.target.dataset.value)}
          >
            Found {get(props, item.propsName, "")} recalls by {item.by}
          </p>
         
        })}
      </div>
    </div>
  );
};
