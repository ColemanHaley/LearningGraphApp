var heads = new Headers({});
const api_call = (url, setData, setIsLoading, headers = heads) => {
  fetch("http://localhost:5000" + url, {
    method: "GET",
    headers: headers
  })
    .then(res => res.json())
    .then(response => {
      setData(response);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
};

export default api_call;
