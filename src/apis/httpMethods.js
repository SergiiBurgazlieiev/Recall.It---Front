export const get = url => {
  return fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(res => res);
};

export const post = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(res => res);
};
