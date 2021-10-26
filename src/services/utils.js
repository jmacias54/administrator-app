function getBase64(file) {
    if (file != null) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result.replace('data:', '')
                .replace(/^.+,/, ''))
            reader.onerror = error => reject(error)
        })
    }
}

function validarCURP(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    var validado = curp.match(re)

    // Coincide con el formato general?
    if (!validado) { return false }

    // Validar que coincida el dígito verificador
    /* function digitoVerificador(curp17) {
        // Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
        var lngSuma = 0.0
        var lngDigito = 0.0
        for (var i = 0; i < 17; i++) { lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i) }
        lngDigito = 10 - lngSuma % 10
        if (lngDigito == 10) { return 0 }
        return lngDigito
    }
    if (validado[2] != digitoVerificador(validado[1])) { return false }
*/
    return true // Validado
}


function nssValido(nss) {
    const re       = /^(\d{2})(\d{2})(\d{2})\d{5}$/,
          validado = nss.match(re);
        
    if (!validado)  // 11 dígitos y subdelegación válida?
        return false;
        
    const subDeleg = parseInt(validado[1],10),
          anno     = new Date().getFullYear() % 100;
    var   annoAlta = parseInt(validado[2],10),
          annoNac  = parseInt(validado[3],10);
    
    //Comparar años (excepto que no tenga año de nacimiento)
    if (subDeleg != 97) {
        if (annoAlta <= anno) annoAlta += 100;
        if (annoNac  <= anno) annoNac  += 100;
        if (annoNac  >  annoAlta)
    	    return false; // Err: se dio de alta antes de nacer!
    }
    
    return luhn(nss);
}

function luhn(nss) {
    var suma   = 0,
        par    = false,
        digito;
    
    for (var i = nss.length - 1; i >= 0; i--) {
        var digito = parseInt(nss.charAt(i),10);
        if (par)
        	if ((digito *= 2) > 9)
        	    digito -= 9;
        
        par = !par;
        suma += digito;
    }
    return (suma % 10) == 0;
}

function validarNumeros(dato){
    var valoresAceptados = /^[0-9]+$/;
       if (dato.match(valoresAceptados)){
            return true;
       } else {
            return false;
      }
}

export default {
    getBase64,
    validarCURP,
    nssValido,
    validarNumeros,

}
