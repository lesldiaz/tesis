import {Like, Repository} from 'typeorm';
import {RespuestaInterface} from '../../interfaces/respuesta.interface';
import {RespuestaBuscarInterface} from '../../interfaces/respuesta.buscar.interface';
import * as moment from 'moment';

export class ServiceGeneral<Entity> {
    constructor(private readonly _repository: Repository<Entity>) {
    }

    async crear(objeto): Promise<Entity | string> {
        try {
            if (objeto.length > 1) {
                objeto.forEach(async nuevo => {
                    nuevo.createdAt = moment().format().toString();
                    nuevo.updatedAt = moment().format().toString();
                    await this._repository.save(nuevo);
                });
                return new Promise((resolve, reject) =>
                    resolve('Completo'),
                );
            } else {
                objeto.createdAt = moment().format().toString();
                objeto.updatedAt = moment().format().toString();
                return await this._repository.save(objeto);
            }

        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async editar(
        id: number,
        objeto: Entity | any,
    ): Promise<RespuestaInterface<Entity> | string> {
        try {
            const existeObjeto = await this._repository.findOne({where: {id}});
            if (existeObjeto) {
                objeto.updatedAt = moment().format().toString();
                const respuestaEditar = await this._repository.update(id, objeto);
                const actualizacionExitosa: boolean =
                    respuestaEditar.affected > 0;
                if (actualizacionExitosa) {
                    return new Promise(resolve =>
                        resolve({
                            mensaje: 'Actualizada correctamente',
                            codigoRespuesta: 200,
                        }),
                    );
                } else {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al actualizar'),
                    );
                }
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'Id no encontrado',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async eliminar(id: number): Promise<RespuestaInterface<Entity> | string> {
        try {
            const encontrar = await this._repository.findOne({where: {id}}
            );
            if (encontrar) {
                const respuestaEliminar = await this._repository.delete(id);
                const eliminaExitoso: boolean = respuestaEliminar.affected > 0;
                if (eliminaExitoso) {
                    return new Promise(resolve =>
                        resolve({
                            mensaje: 'Eliminado correctamente',
                            codigoRespuesta: 200,
                        }),
                    );
                } else {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al eliminar'),
                    );
                }
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'Id no encontrado ',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async eliminarMasivo(aEliminar: any): Promise<RespuestaInterface<Entity> | string> {
        try {
            aEliminar.forEach(async objetoAEliminar => {
                const encontrar = await this._repository.findOne(
                    {
                        where: {
                            id: objetoAEliminar,
                        }
                    }
                );
                if (encontrar) {
                    const respuestaEliminar = await this._repository.delete(aEliminar as number);
                    const eliminaExitoso: boolean = respuestaEliminar.affected > 0;
                    if (!eliminaExitoso) {
                        return new Promise((resolve, reject) =>
                            reject('Ocurrió un error al eliminar'),
                        );
                    }
                } else {
                    return new Promise(resolve =>
                        resolve({
                            mensaje: 'Id no encontrado ',
                            codigoRespuesta: 404,
                        }),
                    );
                }
            });
            return new Promise(resolve =>
                resolve({
                    mensaje: 'Eliminados correctamente',
                    codigoRespuesta: 200,
                }),
            );
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async buscarPorId(id: number): Promise<RespuestaInterface<Entity> | string> {
        try {
            const encontrar = await this._repository.findOne(
                {where: {id: id}}
            );
            if (encontrar) {
                const resultado: RespuestaBuscarInterface<Entity> = {
                    resultado: encontrar,
                    totalResultados: 1,
                };
                return new Promise(resolve =>
                    resolve({
                        mensaje: resultado,
                        codigoRespuesta: 200,
                    }),
                );
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'Id no existe',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async buscarPorParametros(
        query,
    ): Promise<RespuestaInterface<Entity[]> | string> {
        try {
            const orden: any = {id: 'DESC'};
            const busqueda: any = JSON.parse(query.criterioBusqueda);
            const skipQB = busqueda.skip;
            const takeQB = busqueda.take;
            delete busqueda['skip'];
            delete busqueda['take'];
            const atributos = Object.keys(busqueda);
            atributos.forEach(atributo => {
                busqueda[atributo] = Like(`%${busqueda[atributo]}%`);
            });
            const whereOR = []
            for (const property in busqueda) {
                const whereORS = {};
                whereORS[property] = busqueda[property];
                whereOR.push(whereORS);
            }
            const opciones =
                {
                    where: [
                        ...whereOR
                    ],
                    order: {...orden},
                    skip: skipQB,
                    take: takeQB
                };
            const encontrar = await this._repository.findAndCount(opciones);
            if (encontrar[1] > 0) {
                const resultado: RespuestaBuscarInterface<Entity[]> = {
                    resultado: encontrar[0],
                    totalResultados: encontrar[1],
                };
                return new Promise(resolve =>
                    resolve({
                        mensaje: resultado,
                        codigoRespuesta: 200,
                    }),
                );
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'No existen resultados',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            console.error(e);
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async listarTodos(
        criteriosPaginacion?,
    ): Promise<RespuestaInterface<Entity[]> | string> {
        try {
            const orden: any = {id: 'DESC'};
            const busqueda: any = JSON.parse(JSON.stringify(criteriosPaginacion));
            delete busqueda['skip'];
            delete busqueda['take'];
            let listarTodo;
            if (busqueda) {
                const atributos = Object.keys(busqueda);
                atributos.forEach(atributo => {
                    busqueda[atributo] = Like(`%${busqueda[atributo]}%`);
                });
                listarTodo = await this._repository.findAndCount({
                    where: {...busqueda},
                    order: {...orden},
                    skip: criteriosPaginacion.skip,
                    take: criteriosPaginacion.take,
                });
            } else {
                listarTodo = await this._repository.findAndCount({
                    ...criteriosPaginacion,
                    order: {
                        id: 'DESC',
                    },
                });
            }
            if (listarTodo[1] > 0) {
                const resultado: RespuestaBuscarInterface<Entity[]> = {
                    resultado: listarTodo[0],
                    totalResultados: listarTodo[1],
                };
                return new Promise(resolve =>
                    resolve({
                        mensaje: resultado,
                        codigoRespuesta: 200,
                    }),
                );
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'No existen resultados',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }
}
