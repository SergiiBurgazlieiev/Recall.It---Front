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
