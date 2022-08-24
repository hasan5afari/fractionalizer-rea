const BASEURL = 'http://localhost:5000'

const makeGetRequest = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    headers: new Headers({
      'Authorization': 'Bearer ' + accessToken
    })
  })
}

const makePostRequest = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(requestBody)
  })
}

const makePostRequestFormData = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: requestBody
  })
}

const makePatchRequest = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(requestBody)
  })
}

const makePatchRequestFormData = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: requestBody
  })
}

const makeDeleteRequest = async (pathName, requestBody, accessToken) => {
  return await fetch(`${BASEURL}/${pathName}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(requestBody)
  })
}

const getCookie = (name) => {
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(name + '=');
  });
}

const deleteCookie = (name, path, domain) => {
  debugger
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

    return true
  } else {
    return false
  }
}

const userLogedIn = () => {
  const loged = localStorage.getItem('logedIn')
  if (loged && loged === 'true') {
    return true
  } else {
    return false
  }
}

export {
  makeGetRequest,
  makePostRequest,
  makePostRequestFormData,
  makePatchRequest,
  makePatchRequestFormData,
  makeDeleteRequest,
  deleteCookie,
  userLogedIn
}