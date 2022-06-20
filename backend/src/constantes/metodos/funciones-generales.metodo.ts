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
  }
};
