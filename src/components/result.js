import React from "react";
import get from "lodash/get";

export default ({ resultsOff, ...props }) => {
  const elements = [
    {
      name: "Product",
      propsName: "productsByNameNumber",
      by: "product"
    },
    {
      name: "Category",
      propsName: "productsByTypeNumber",
      by: "category"
    },
    {
      name: "Manufacturer",
      propsName: "productsByManufacturerNumber",
      by: "manufacturer"
    }
  ];

  let elem = [];
  let handleProdNameVal = value => {
    elem.push(value);
    return elem;
  };

  return (
    <div>
      <div className="resultWindow">
        <div>
          <h3>Recall.it</h3>
        </div>
        {elements.map((item, key) => {
          if(get(props, item.propsName, "") !== 0){
            {handleProdNameVal(item.name)}

            return (
              <p
                className="productLinks"
                key={key}
                data-value={item.name}
                onClick={e => {
                  resultsOff(e.target.dataset.value, elem);
                }}
              >
                Found {get(props, item.propsName, "")} recalls by {item.by}
              </p>
            );
          } else {
            return (
              <p className="productNoLinks" key={key}>
                Found {get(props, item.propsName, "")} recalls by {item.by}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};
