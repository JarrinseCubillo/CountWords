const contadorDePalabras = (text) => {

    let conteo = {
        palabras: 0,
        caracteres: 0,
        oraciones: 0,
        palabraMasLarga: [],
        longitudPromedioPalabra: 0
    };

    conteo.caracteres = (text.match(/[a-záéíóúüñ]/gi) || []).length;
    conteo.palabras = (text.match(/[a-zA-ZÀ-ÿ]+(?:'[a-z]+)?/gi) || []).length;
    conteo.oraciones = (text.match(/[^.!?]+[.!?]*(?=\s|$|[^a-zA-ZÀ-ÿ])/g) || []).length;
    conteo.longitudPromedioPalabra = conteo.caracteres / conteo.palabras;
    conteo.palabraMasLarga = encontrarPalabraMasLarga(text.match(/[a-zA-ZÀ-ÿ]+(?:'[a-z]+)?/gi) || []);

    return conteo;
}

const revisar = () => {
    const text = document.getElementById('text').value;
    if(text.length <1){
        alert("Ingrese datos para revisar.");
        return;
    }
    const conteo = contadorDePalabras(text);

    document.getElementById('conteo_palabras').textContent = conteo.palabras;
    document.getElementById('tamanio_promedio_palabra').textContent = conteo.longitudPromedioPalabra > 0 ? conteo.longitudPromedioPalabra.toFixed(2) : '0';
    document.getElementById('conteo_oraciones').textContent = conteo.oraciones;
    document.getElementById('palabra_mas_larga').textContent = conteo.palabraMasLarga.length > 0 ? conteo.palabraMasLarga : '';
}

const limpiar = () => {
    document.getElementById('text').value = '';
    document.getElementById('conteo_palabras').textContent = '0';
    document.getElementById('tamanio_promedio_palabra').textContent = '0';
    document.getElementById('conteo_oraciones').textContent = '0';
    document.getElementById('palabra_mas_larga').textContent = '';
}


function encontrarPalabraMasLarga(palabras){
    let longitudPalabraActual= 0;
    let palabrasMasLargas = [];

    for (const palabra of palabras) {
        const longitud = palabra.length;

        if(longitud > longitudPalabraActual) {
            longitudPalabraActual = longitud;
            palabrasMasLargas=[palabra];
        }

        if(longitud===longitudPalabraActual && !palabrasMasLargas.includes(palabra)) palabrasMasLargas.push(palabra);
    }
    return palabrasMasLargas.join(",");
}