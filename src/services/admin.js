import requestSrv from './index'

function getAll () {
  return new Promise((resolve, reject) => {
    requestSrv({
      path: 'api/admin/',
      method: 'GET',
    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

function insert (data) {
  return new Promise((resolve, reject) => {
    requestSrv({
      path: 'api/admin/',
      method: 'POST',
      data,

    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

function update (data) {
  return new Promise((resolve, reject) => {
    requestSrv({
      path: 'api/admin/',
      method: 'PUT',
      data,

    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

function delete_item (id) {
  return new Promise((resolve, reject) => {
    requestSrv({
      path: `api/admin/${id}`,
      method: 'DELETE',

    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

function findByID (id) {
  return new Promise((resolve, reject) => {
    requestSrv({
      path: `api/admin/${id}`,
      method: 'GET',

    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

export default {
  getAll,
  delete_item,
  findByID,
  update,
  insert,
}
