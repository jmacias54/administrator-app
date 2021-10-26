import axios from 'axios'
//LOCAL : axios.defaults.baseURL = 'https://administrators-api.herokuapp.com/'
DESARROLLO: axios.defaults.baseURL = "https://administrators-api.herokuapp.com/";

//produccion: axios.defaults.baseURL = "https://administrators-api.herokuapp.com/"
export default function executeRequest({
  path,
  data = {},
  method = 'GET',
  mocky = false,
  responseType,
  headers,
  params,
}) {
  function setQueryString(queryStringObj, methodReq) {
    if (methodReq === 'GET') {

      let queryString = ''
      const firstKeyProp = Object.keys(queryStringObj)[0]
      Object.keys(queryStringObj).forEach(prop => {
        queryString += `${prop === firstKeyProp ? '?' : '&'}${prop}=${queryStringObj[prop]
          }`
      })
      return queryString
    }
    return ''
  }
  const url = `${path}${setQueryString(data, method)}`
  const timeout = 60 * 4 * 1000;//4min
  if (mocky) {
    console.log(mocky)
  }

  const token = sessionStorage.getItem('token')

  if (token != null && token !== '') {
    headers = {
      Authorization: 'Bearer ' + token,
    }
  }

  return axios({
    method,
    url,
    data,
    responseType,
    headers,
    params,
    timeout,
  })
    .then(res => Promise.resolve(res))
    .catch(error => Promise.reject(error))
}
