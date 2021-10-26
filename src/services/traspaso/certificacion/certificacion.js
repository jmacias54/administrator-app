import requestSrv from '@/services/index'

const end_point = 'middle/certificacion-traspasos/ejecucion-certificacion/';

function ejecucion(ejecucionCertificacionIn) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: end_point,
            method: 'POST',
            data: {
                fechaPresentacion: ejecucionCertificacionIn.fechaPresentacion,
                usuarioEjecutor: ejecucionCertificacionIn.usuario,
                consecutivoDiario: ejecucionCertificacionIn.consecutivoDiario,
                loteInicio: Number(ejecucionCertificacionIn.semanaProductivaInicio),
                loteFin: Number(ejecucionCertificacionIn.semanaProductivaFin)
            },
        })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}
function consulta_bit(pagina, totalRegistros) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: end_point + pagina + '/' + totalRegistros + '/',
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

function insertar_bitacora(registro) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: end_point,
            method: 'PUT',
            data: registro,
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
    ejecucion,
    consulta_bit,
    insertar_bitacora
}