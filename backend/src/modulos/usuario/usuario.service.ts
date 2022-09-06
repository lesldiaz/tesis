import {Injectable} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as moment from 'moment';
import * as nodemailer from 'nodemailer';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import {FUNCIONES_GENERALES} from 'src/constantes/metodos/funciones-generales.metodo';

@Injectable()
export class UsuarioService extends ServiceGeneral<UsuarioEntity> {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
        super(_usuarioRepository);
    }

    async autenticacion(usuario): Promise<UsuarioEntity | string> {
        try {
            const encontrar = await this._usuarioRepository.findOne({
                where: [
                    {
                        nombreUsuario: usuario.nombreUsuario,
                        contrasena: usuario.contrasena
                    },
                    {
                        nombreUsuario: usuario.nombreUsuario,
                        contrasenaTemporal: usuario.contrasena
                    }
                ]
            });
            if (encontrar) {
                return encontrar;
            } else {
                return new Promise(resolve =>
                    resolve(
                        'Credenciales incorrectas'
                    ),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async registro(usuario): Promise<UsuarioEntity | string> {
        try {
            usuario.createdAt = moment().format().toString();
            usuario.updatedAt = moment().format().toString();
            const respuestaUsuarios =
                await this._usuarioRepository
                    .find({
                        where: [
                            {nombreUsuario: usuario.nombreUsuario},
                            {email: usuario.email}
                        ]

                    });
            const usuarioNoEncontrado: boolean =
                respuestaUsuarios.length === 0;
            if (usuarioNoEncontrado) {
                const usuarioCreado = await this._usuarioRepository.save(usuario);
                return usuarioCreado;
            } else {
                return new Promise((resolve, reject) =>
                    reject('El nombre de usuario o correo electrónico ya esta en uso'),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async recuperarContraseña(usuario): Promise<UsuarioEntity | string> {
        try {
            const encontrar = await this._usuarioRepository.findOne({
                where: {
                    nombreUsuario: usuario.nombreUsuario
                }
            });
            if (encontrar) {
                const contraseñaSeguraArray = [];
                for (let i = 0; i < 9; i++) {
                    const caracter = FUNCIONES_GENERALES.generaCaracter();
                    contraseñaSeguraArray.push(caracter);
                }
                const emailUsuario = encontrar.email;
                const contrasenaSegura = contraseñaSeguraArray.join('');
                const respuestaEditar =
                    await this._usuarioRepository
                        .update(
                            encontrar.id,
                            {
                                contrasenaTemporal: contrasenaSegura,
                                contrasena: contrasenaSegura
                            });
                const actualizacionExitosa: boolean =
                    respuestaEditar.affected > 0;
                if (actualizacionExitosa) {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'vraw2022@gmail.com', // generated ethereal user
                            pass: 'sgqcmsguzvhlgpzj', // generated ethereal password
                        },
                    });
                    let info = await transporter.sendMail({
                        from: '"AVaRS" <vraw2022@gmail.com>', // sender address
                        to: emailUsuario, // list of receivers
                        subject: "Recuperar Contraseña", // Subject line
                        // text: "Hello world?", plain text body
                        html: " <p>Hola,</p>" +
                            "<p>Alguien solicito una nueva contraseña para tu cuenta en AVaRS.</p>" +
                            "<p>Tu contraseña temporal es <b>" + contrasenaSegura + "</b></p>" +
                            "<p>Si no lo solicitaste, por favor cambia tu contraseña lo más pronto posible. 🙂</p>",
                    });
                    return new Promise((resolve, reject) =>
                        resolve(
                            'Completado'
                        ),
                    );
                } else {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al crear id del proyecto'),
                    );
                }

            } else {
                return new Promise((resolve, reject) =>
                    reject(
                        'Usuario no encontrado'
                    ),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async cambiarContraseña(usuario): Promise<UsuarioEntity | string> {
        try {
            const encontrar = await this._usuarioRepository.findOne({
                where: {
                    id: usuario.id,
                }
            });
            if (encontrar) {
                const contraseñaSeguraArray = [];
                for (let i = 0; i < 9; i++) {
                    const caracter = FUNCIONES_GENERALES.generaCaracter();
                    contraseñaSeguraArray.push(caracter);
                }
                const contraseñaSegura = contraseñaSeguraArray.join('');

            } else {
                return new Promise((resolve, reject) =>
                    reject(
                        'Usuario no encontrado'
                    ),
                );
            }

        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }
}