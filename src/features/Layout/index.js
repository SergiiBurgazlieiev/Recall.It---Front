/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Logo from "../../components/logo";
import Products from "../products";
import Result from "../../components/result";
import { parseQueryString } from "../../utils";
import { getProduct, scrapProduct } from "../../apis/product";
import iconRisky from "../../assets/images/risky.png"
import iconMed from "../../assets/images/medium.png"
import iconNeut from "../../assets/images/neutral.png"
import iconNon from "../../assets/images/none.png"

export default () => {
  const [displayProductsResult, setDisplayProductsResult] = useState(false);
  const [displayListOfProducts, setDisplayListOfProducts] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [state, setState] = useState({
    productsByName: [],
    productsByType: [],
    productsByManufacturer: []
  });
  const [product, setProduct] = useState({
    image: "",
    name: "",
    description: "",
    isDataRequest: true
  });

  const [framseState, setFrameState] = useState({
    fullscreen: false,
    maxContentHeight: document.body.offsetHeight
  });
  const [parentIframe, setParentIframe] = useState(null);
  const [parentDisableAutoSize, setParentDisableAutoSize] = useState(false);
  const [icon, setIcon] = useState(iconNeut);
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
  }, []);

  let getSize = () => {
    if (!displayProductsResult && !displayListOfProducts) {
      return [60, 60];
    } else if (displayProductsResult && !displayListOfProducts) {
      return [250, 460];
    } else if (!displayProductsResult && displayListOfProducts) {
      return [780, 500];
    } else return [250, 460];
  };

  let updateSize = () => {
    if (parentIframe) {
      let estimated = getSize();
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

  const retrieveProductData = async () => {
    try {
      let productsByName = await getProduct({
        ProductName: product.name,
        format: "json"
      });

      let productsByType = await getProduct({
        ProductType: product.categorie,
        format: "json"
      });
      let productsByManufacturer = await getProduct({
        Manufacturer: product.by,
        format: "json"
      });
      setState({ productsByName, productsByType, productsByManufacturer });

      if(productsByManufacturer.length > 5 && productsByType.length > 5){
        setIcon(iconMed);
      }else if(productsByName.length > 0){
        setIcon(iconRisky);
      }else if(productsByName.length == 0 && productsByType.length ==0 && productsByManufacturer.length == 0){
        setIcon(iconNon)
      }else{
        setIcon(iconNeut)
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (!product.isDataRequest) retrieveProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    let params = parseQueryString();

    (async () => {
      try {
        let data = await scrapProduct({ url: params.url });

        if (data.success)
          setProduct({
            image: data.img,
            name: data.title,
            by: data.by,
            categorie: data.categories[categories.length],
            isDataRequest: false
          });
        else
          setProduct({
            image: params.image,
            name: params.productTitle,
            by: params.by,
            categorie: params.categorie,
            isDataRequest: false
          });
      } catch (e) {
        setProduct({
          image: params.image,
          name: params.productTitle,
          by: params.by,
          categorie: params.categorie,
          isDataRequest: false
        });
      }
    })();
  }, []);
  
  console.log("product name")
  console.log(productName);
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
          prdName={productName}
        />
      ) : null}
      <Logo
        showResults={() => {
          console.log(document.getElementById("randomid"));
          setDisplayProductsResult(!displayProductsResult);
          setDisplayListOfProducts(false);
        }}
        icon={icon}
      />
    </div>
  );
};
