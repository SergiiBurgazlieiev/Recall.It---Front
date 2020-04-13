/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Logo from "../../components/logo";
import Products from "../products";
import Result from "../../components/result";
import { getData, getSize } from "./utils";
import iconRisky from "../../assets/images/risky.png";
import iconMed from "../../assets/images/medium.png";
import iconNeut from "../../assets/images/neutral.png";
import iconNon from "../../assets/images/none.png";
import iconLoad from "../../assets/images/001gif.gif";

export default () => {
  const [displayProductsResult, setDisplayProductsResult] = useState(false);
  const [displayListOfProducts, setDisplayListOfProducts] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [state, setState] = useState({
    productsByName: [],
    productsByType: [],
    productsByManufacturer: []
  });
  const [requested, setRequested] = useState(false);
  const [framseState, setFrameState] = useState({
    fullscreen: false,
    maxContentHeight: document.body.offsetHeight
  });
  const [parentIframe, setParentIframe] = useState(null);
  const [parentDisableAutoSize, setParentDisableAutoSize] = useState(false);
  const [icon, setIcon] = useState(iconLoad);
  const [productName, setProductName] = useState([]);

  useEffect(() => {
    window.iFrameResizer = {
      readyCallback: () => {
        setParentIframe(window.parentIFrame);
        window.parentIFrame.getPageInfo(data => {
          let newHeight = data.clientHeight;
          if (framseState.maxContentHeight !== newHeight) {
            setFrameState({
              ...framseState,
              clientHeight: data.clientHeight,
              maxContentHeight: newHeight
            });
          }
        });
      }
    };

    (async () => {
      try {
        let {
          productsByName,
          productsByType,
          productsByManufacturer,
          dataChats
        } = await getData();

        setState({
          productsByName,
          productsByType,
          productsByManufacturer,
          dataChats
        });
        //after request is completed 
        // change the icon 
        setRequested(true);
        if (productsByManufacturer.length > 5 && productsByType.length > 5) {
          setIcon(iconMed);
        } else if (productsByName.length > 0) {
          setIcon(iconRisky);
        } else if (
          productsByName.length === 0 &&
          productsByType.length === 0 &&
          productsByManufacturer.length === 0
        ) {
          setIcon(iconNon);
        } else {
          setIcon(iconNeut);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  let updateSize = () => {
    if (parentIframe) {
      let estimated = getSize(displayProductsResult, displayListOfProducts);
      parentIframe.size(estimated[0], estimated[1]);

      if (parentDisableAutoSize === false) {
        parentIframe.autoResize(false);
        setParentDisableAutoSize(true);
      }
    }
  };

  useEffect(() => {
    updateSize();
  }, [displayProductsResult, displayListOfProducts, parentIframe]);

  console.log(requested);
  return (
    <div className="App">
      {displayProductsResult ? (
        <Result
          productsByNameNumber={state.productsByName.length}
          productsByTypeNumber={state.productsByType.length}
          productsByManufacturerNumber={state.productsByManufacturer.length}
          resultsOff={(val, prodName) => {
            setDisplayProductsResult(!displayProductsResult);
            setDisplayListOfProducts(!displayListOfProducts);
            setProductValue(val);
            setProductName(productName => [...productName, prodName]);
          }}
        />
      ) : null}
      {displayListOfProducts ? (
        <Products
          prdValue={productValue}
          productsData={[
            state.productsByName,
            state.productsByType,
            state.productsByManufacturer
          ]}
          dataChats={state.dataChats}
          prdName={productName}
        />
      ) : null}
      <Logo
        showResults={() => {
          setDisplayProductsResult(!displayProductsResult);
          setDisplayListOfProducts(false);
        }}
        requested={requested}
        icon={icon}
      />
    </div>
  );
};
