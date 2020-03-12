import get from "lodash/get";
import {
  scrapCategoryApprox,
  scrapCategoryDetails,
  scrapManufacturerApprox,
  scrapManufacturerDetails,
  scrapTitleDetails
} from "../../apis/product";
import { parseQueryString } from "../../utils";

export const getData = async () => {
  let { by, title, category } = parseQueryString();

  let dataByTitle = await scrapTitleDetails({ title: decodeURI(title) });

  let manufacturerAprox = await scrapManufacturerApprox({
    manufacturer: decodeURI(by)
  });
  let manufacturerDetails = await scrapManufacturerDetails({
    manufacturer: manufacturerAprox.manufacturer_approx
  });
  let categoryAprox = await scrapCategoryApprox({
    category: decodeURI(category)
  });
  let categoryDetails = await scrapCategoryDetails({
    category: get(categoryAprox, "category_approx", "")
  });

  let productsByManufacturer = get(
    manufacturerDetails,
    "results_manufacturer",
    []
  );
  let productsByName = get(dataByTitle, "results_title", []);
  let productsByType = get(categoryDetails, "results_category", []);

  return {
    productsByManufacturer,
    productsByName,
    productsByType
  };
};

export const getSize = (displayProductsResult, displayListOfProducts) => {
  if (!displayProductsResult && !displayListOfProducts) {
    return [60, 60];
  } else if (displayProductsResult && !displayListOfProducts) {
    return [250, 460];
  } else if (!displayProductsResult && displayListOfProducts) {
    return [780, 500];
  } else return [250, 460];
};
