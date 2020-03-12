import { get, post } from "./httpMethods";
import { prepareQuery } from "../utils";

export const getProduct = data => {
  return get(
    `https://www.saferproducts.gov/RestWebServices/Recall${prepareQuery(data)}`
  );
};

export const scrapProduct = data => {
  return post("https://recallit-back.herokuapp.com/scraping/get", data);
};

export const scrapCategoryApprox = data => {
  return post(
    "https://recallit-back.herokuapp.com/scraping/get/category_approx",
    data
  );
};

export const scrapCategoryDetails = data => {
  return post(
    "https://recallit-back.herokuapp.com/scraping/get/category_details",
    data
  );
};

export const scrapTitleDetails = data => {
  return post(
    "https://recallit-back.herokuapp.com/scraping/get/title_details",
    data
  );
};

export const scrapManufacturerDetails = data => {
  return post(
    "https://recallit-back.herokuapp.com/scraping/get/manufacturer_details",
    data
  );
};

export const scrapManufacturerApprox = data => {
  return post(
    "https://recallit-back.herokuapp.com/scraping/get/manufacturer_approx",
    data
  );
};
