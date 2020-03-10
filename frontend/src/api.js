var heads = new Headers({});
const api_call = (
  url,
  setData,
  setIsLoading,
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
      setData(response);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
};

export default api_call;
