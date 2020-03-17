import React, { useState } from "react";
import get from "lodash/get";
import moment from "moment";

export default ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log("get product")
  console.log(get(product));
  console.log("get URL");
  console.log(get(product, "URL", ""));
  return (
    <div style={{ marginBottom: "13px" }}>
      <div
        style={{
          display: "flex",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          background: "white"
        }}
      >
        <img
          src={get(product, "image", "https://dapp.dblog.org/img/default.jpg")}
          alt="n/a"
          className="imgWindow"
        />
        <div style={{}}>

          <a href={get(product, "URL", "")}>{get(product, "Title", "")}</a>

          <p
            style={{
              width: "173px",
              height: "23px",
              borderRadius: "20px",
              background: "lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontstyle: "italic"
            }}
          >
            recalled date{" "}
            {moment(get(product, "recalldate", "")).isValid()
              ? moment(product.recalldate).format("MMM DD, YYYY")
              : ""}
          </p>
          {showDetails && (
            <div>
              <p>
                <b>Hazard</b> {get(product, "title", "")}{" "}
              </p>
              <p>
                <b>Description</b> {get(product, "description", "")}{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          cursor: "pointer",
          background: "#e4e4e4",
          height: "30px",
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "HIDE DETAILS" : "VIEW DETAILS"}
      </div>
    </div>
  );
};
