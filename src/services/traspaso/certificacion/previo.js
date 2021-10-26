import requestSrv from '@/services/index'

function previo(idLoteProductivoInicio, idLoteProductivoFin) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/certificacion-traspasos/previo',
            method: 'POST',
            data: {

                idLoteProductivoInicio,
                idLoteProductivoFin,

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

export default {
    previo,


}