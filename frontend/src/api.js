var heads = new Headers({});
const api_call = (
  url,
  setData = () => null,
  setLoading = () => null,
  method = "GET",
  body = null,
  headers = heads
) => {
  var params = {
    method: method,
    headers: headers
  };
  if (body != null) {
    params.body = body;
  }
  fetch("http://localhost:5000" + url, params)
    .then(res => res.json())
    .then(response => {
      //const { error, ...data } = response;
      // if (typeof error !== "undefined") {
      //   setError(error);
      // }
      setData(response);
      setLoading(false);
    })
    .catch(error => console.log(error));
};

export const api_json = (
  url,
  setData = () => null,
  setLoading = () => null,
  setError = () => null,
  method = "GET",
  body = null,
  headers = heads
) => {
  var params = {
    method: method,
    headers: new Headers({ ...headers, "Content-Type": "application/json" })
  };
  if (body != null) {
    params.body = body;
  }
  fetch("http://localhost:5000" + url, params)
    .then(res => res.json())
    .then(response => {
      const { error, ...data } = response;
      if (typeof error !== "undefined") {
        setError(error);
      }
      setData(data);
      setLoading(false);
    })
    .catch(error => console.log(error));
};

export default api_call;
