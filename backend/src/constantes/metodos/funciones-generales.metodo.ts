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
    generarIdProyecto: (objeto) => {
        const idProNum = objeto.id;
        const tipoProyecto = objeto.tipoProyecto;
        const nuevoIdProyecto = 'P' + tipoProyecto + idProNum;
        return nuevoIdProyecto;
    },
    generarIdRequerimiento: (objeto) => {
        const idReqNum = objeto.id;
        const tipoRequerimiento = objeto.tipoProyecto;
        const nuevoIdRequerimiento = 'R' + tipoRequerimiento + idReqNum;
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
        return  listaCaracteres.charAt(FUNCIONES_GENERALES.generaAleatorio(valorInferior, valorSuperior));
    }
};
