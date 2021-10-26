import requestSrv from '@/services/index'

function obtenerCatalogos () {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/admin-app/catalogos/',
            method: 'GET',
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function obtenerElementos (idCatalogo) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/admin-app/catalogos/',
            method: 'POST',
            data: { idCatalogo },
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function insertarElemento (elemento) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/admin-app/catalogos/insertar',
            method: 'POST',
            data: elemento,
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function actualizarElemento (elemento) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/admin-app/catalogos/actualizar',
            method: 'POST',
            data: elemento,
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default {
    obtenerCatalogos,
    obtenerElementos,
    insertarElemento,
    actualizarElemento,

}
