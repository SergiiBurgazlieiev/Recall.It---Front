import React, {useState, useEffect} from "react";
import get from "lodash/get";

import styles from './result.module.css';

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

  const [productNameVal,setProductNameVal] = useState([]); 

  let elem = [];
  let handleProdNameVal = (value) => {
    elem.push(value);
    return null
  };

  return (
    <div >
      <div className={styles.ResultWindow}>
         {/* <div>
          <h3>Recall.it</h3>
        </div>  */}
        <div className={styles.LinksContainer}>
          {elements.map((item, key) => {
            if(get(props, item.propsName, "") !== 0){
              {handleProdNameVal(item.name)}

              return ( 
                <p
                  className={styles.ProductsLink}
                  key={key}
                  data-value={item.name}
                  onClick={e => resultsOff(e.target.dataset.value, elem)}
                >
                  Found {get(props, item.propsName, "")} recalls by {item.by}
                </p>
              );

            } else {

              return  (
                <p
                  className={styles.ProductsLink}
                  key={key}
                >
                  Found {get(props, item.propsName, "")} recalls by {item.by}
                </p>
              );
            }
          })}
        </div>
        <div className={styles.Neiss}>
          {handleProdNameVal("Neiss")}
            <p className={styles.ProductsLink} data-value="Neiss" onClick={ e => {
              resultsOff(e.target.dataset.value, elem)
            }}>Click here to learn more about emergency rooms related to this category</p>
        </div>

        </div>
          
    </div>
  );
};
