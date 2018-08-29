const axiosData = {
  baseURL: 'https://api.stackexchange.com/2.2/',
  timeout: 3000,
  headers: {
    //"Authorization": "Bearer ",
    "Content-Type": "application/json",
    // crossDomain: true,
    'Accept': "application/json",
    //'X-Requested-With': 'XMLHttpRequest'
  },
}

export default axiosData
