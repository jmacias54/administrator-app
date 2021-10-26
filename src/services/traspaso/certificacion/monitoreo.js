import requestSrv from '@/services/index'

function monitoreo(loteControl) {
    return new Promise((resolve, reject) => {
        requestSrv({
            path: 'middle/certificacion-traspasos/monitoreo',
            method: 'POST',
            data: {

                idLoteControl: loteControl

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
    monitoreo,
}