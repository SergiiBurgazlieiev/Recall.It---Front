export function prepareQuery(params) {
  if (params && Object.keys(params).length === 0) return "";
  else
    return (
      "?" +
      Object.keys(params)
        .map(key => key + "=" + params[key])
        .join("&")
    );
}

export function parseQueryString() {
  var str = window.location.search;
  var objURL = {};

  str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(
    $0,
    $1,
    $2,
    $3
  ) {
    objURL[$1] = $3;
  });
  return objURL;
}
