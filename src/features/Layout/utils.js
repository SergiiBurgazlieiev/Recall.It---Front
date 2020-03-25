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

  let categories = category.split("_");

  let dataByTitle = await scrapTitleDetails({ title: decodeURI(title) });

  let manufacturerAprox = await scrapManufacturerApprox({
    manufacturer: decodeURI(by)
  });
  let manufacturerDetails = await scrapManufacturerDetails({
    manufacturer: manufacturerAprox.manufacturer_approx
  });
  let categoryDetails = "";
  for (let i = 0; i < categories.length; i++) {
    let categoryAprox = await scrapCategoryApprox({
      category: decodeURI(category)
    })

    categoryDetails = await scrapCategoryDetails({
      category: get(categoryAprox, "category_approx", "")
    });

    if (get(categoryDetails, "results_category", []).length > 0) break;
  }

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
