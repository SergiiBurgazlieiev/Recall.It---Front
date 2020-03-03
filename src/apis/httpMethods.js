export const get = url => {
  return fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(res => res);
};

export const post = (url, data) => {
  let headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  };

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(res => res);
};
