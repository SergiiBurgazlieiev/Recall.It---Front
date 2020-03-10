/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Logo from "../../components/logo";
import Products from "../products";
import Result from "../../components/result";
import { parseQueryString } from "../../utils";
import { getProduct, scrapProduct } from "../../apis/product";
import iconRisky from "../../assets/images/risky.png";
import iconMed from "../../assets/images/medium.png";
import iconNeut from "../../assets/images/neutral.png";
import iconNon from "../../assets/images/none.png";

let data = {
  count_by: 1,
  count_category: 24,
  count_title: 0,
  results_by: [
    {
      description:
        "This recall involves all Joovy’s Zoom gray metal car seat stroller adapters. The adapters are gray with black plastic clips designed to attach infant car seats to stroller frames. The adapter frame’s dimensions are approximately 17” x 13” x 10”. Recalled car seat adapter models include 00945 for Graco, 00946 for Chicco and 00947 for Peg Perego frames. “Joovy” and the model numbers can be found on the label at the center of the end bar of the adapter.",
      image:
        "https://www.cpsc.gov/s3fs-public/Recall.2014.14072.Joovy%25202LARGE.jpg",
      recalldate: "2013-12-30T00:00:00",
      title: "Joovy Recalls Zoom Car Seat Stroller Adapter due to Fall Hazard",
      url:
        "https://www.cpsc.gov/Recalls/2014/Joovy-Recalls-Zoom-Car-Seat-Stroller-Adapter"
    }
  ],
  results_category: [
    {
      description:
        "This recall involves Graco Table2Table™ 6-in-1 highchairs with model number 1969721. The 6-in-1 highchairs convert to six different modes, including a traditional highchair, a booster seat and toddler chair and table. The highchair’s cushion is white with gold and gray polka dots. The model number is printed on a label on the underside of the toddler seat and on a label on the back of the booster seat. Graco and Table2Table highchair are also printed on the label on the underside of the toddler seat.",
      image: "https://www.cpsc.gov/s3fs-public/Picture1_20.png",
      recalldate: "2018-03-01T00:00:00",
      title:
        "Graco Recalls Highchairs Due to Fall Hazard; Sold Exclusively at Walmart",
      url:
        "https://www.cpsc.gov/Recalls/2018/Graco-Recalls-Highchairs-Due-to-Fall-Hazard-Sold-Exclusively-at-Walmart"
    },
    {
      description:
        "This recall includes Safety 1st Wood Décor highchairs in three models: HC144BZF (Casablanca), HC229CZF (Gentle Lace) and HC229CYG (Black Lace). The model numbers are printed under the highchair seat. These A-frame black wood highchairs have a removable fabric, black and white print seat pad with a blue or pink border on the top and bottom of the seat pad. The highchairs have a white plastic, detachable tray with a cone-shaped center divider that fits between a child’s legs. “Safety 1st” is printed on the front center of the tray.",
      image: "https://www.cpsc.gov/s3fs-public/Recall.2016.16006.Highchair.jpg",
      recalldate: "2015-10-08T00:00:00",
      title: "Safety 1st Recalls Décor Wood Highchairs Due to Fall Hazard",
      url:
        "https://www.cpsc.gov/Recalls/2016/Safety-1st-Recalls-Decor-Wood-Highchair"
    }
  ]
};

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
        /*else
          setProduct({
            image: params.image,
            name: params.productTitle,
            by: params.by,
            categorie: params.categorie,
            isDataRequest: false
          });*/
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

  return (
    <div className="App">
      {displayProductsResult ? (
        <Result
          productsByNameNumber={state.productsByName.length}
          productsByTypeNumber={state.productsByType.length}
          productsByManufacturerNumber={state.productsByManufacturer.length}
          resultsOff={val => {
            setDisplayProductsResult(!displayProductsResult);
            setDisplayListOfProducts(!displayListOfProducts);
            setProductValue(val);
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
