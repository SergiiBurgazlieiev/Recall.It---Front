import React from "react";
import get from "lodash/get";

export default ({ resultsOff, ...props }) => {
  const elements = [
    {
      name: "Name",
      propsName: "productsByNameNumber",
      by: "product"
    },
    {
      name: "Type",
      propsName: "productsByTypeNumber",
      by: "category"
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
          if(get(props, item.propsName, "") !== 0){
            return  <p
            className="productLinks"
            key={key}
            data-value={item.name}
            onClick={e => resultsOff(e.target.dataset.value)}
          >
            Found {get(props, item.propsName, "")} recalls by {item.by}
          </p>
          }else{
            return  <p
            className="productNoLinks"
            key={key}
            data-value={item.name}
            onClick={e => resultsOff(e.target.dataset.value)}
          >
            Found {get(props, item.propsName, "")} recalls by {item.by}
          </p>
          }
         
        })}
      </div>
    </div>
  );
};
