import requestSrv from '@/services/index'

const end_point = 'middle/certificacion-traspasos/autenticacion-certificacion/';

function consulta(request) {
    console.log("Consulta:" + request)
    return new Promise((resolve, reject) => {
        requestSrv({
            path: end_point.concat("consultar/"),
            method: 'POST',
            data: request,
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}


function actualizar_estatus(request) {
    console.log("actualizar_estatus:" + request)

    return new Promise((resolve, reject) => {
        requestSrv({
            path: end_point,
            method: 'PUT',
            data: request,
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
    consulta, actualizar_estatus
}