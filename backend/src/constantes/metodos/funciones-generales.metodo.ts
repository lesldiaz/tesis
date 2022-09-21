import * as fs from 'fs';

export const FUNCIONES_GENERALES = {
    crearDatos: (ruta, servicio) => {
        try {
            return new Promise(async (resolve, reject) => {
                fs.readFile('src/constantes/datos/' + ruta, 'utf8', (err, data) => {
                    if (err) {
                        reject({
                            mensaje: 'Error al leer',
                            error: err,
                        });
                    } else {
                        servicio
                            .crear(JSON.parse(data))
                            .then(value => resolve(value))
                            .catch(reason => console.error(reason));
                    }
                });
            });
        } catch (e) {
            console.error('Error Función Crear Datos: ', e);
        }
    },
    generarIdProyecto: (idProNum, tipoProyecto) => {
        let nuevoIdProyecto = 'P';
        if (tipoProyecto === 'C') {
            nuevoIdProyecto = nuevoIdProyecto + 'G' + FUNCIONES_GENERALES.digitosACodigo(idProNum.toString());
        } else {
            nuevoIdProyecto = nuevoIdProyecto + 'iP' + FUNCIONES_GENERALES.digitosACodigo(idProNum.toString());
        }
        return nuevoIdProyecto;
    },
    generarIdRequerimiento: (idReqNum, tipoProyecto) => {
        let nuevoIdRequerimiento = 'R';
        if (tipoProyecto === 'C') {
            nuevoIdRequerimiento = nuevoIdRequerimiento + 'G' + FUNCIONES_GENERALES.digitosACodigo(idReqNum.toString());
        } else {
            nuevoIdRequerimiento = nuevoIdRequerimiento + 'iP' + FUNCIONES_GENERALES.digitosACodigo(idReqNum.toString());
        }
        return nuevoIdRequerimiento;
    },
    generaAleatorio: (numeroInferior, numeroSuperior) => {
        return Math.floor((Math.random() * (numeroSuperior - numeroInferior + 1)) + numeroInferior);
    },
    generaCaracter: () => {
        // hemos creado una lista de caracteres específica, que además no tiene algunos caracteres como la "i" mayúscula ni la "l" minúscula para evitar errores de transcripción
        const listaCaracteres = '$+=?@_23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
        const valorInferior = 0;
        const valorSuperior = 61;
        return listaCaracteres.charAt(FUNCIONES_GENERALES.generaAleatorio(valorInferior, valorSuperior));
    },
    digitosACodigo: (codigo) => {
        let nuevoCodigo = '';
        if (codigo.length === 1) {
            nuevoCodigo = '000' + codigo;
        } else if (codigo.length === 2) {
            nuevoCodigo = '00' + codigo;
        } else if (codigo.length === 3) {
            nuevoCodigo = '0' + codigo;
        } else {
            nuevoCodigo = codigo;
        }
        return nuevoCodigo;
    }
};
