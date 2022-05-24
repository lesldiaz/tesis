import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioSesionEntity} from "./usuario.sesion.entity";
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";

@Injectable()
export class UsuarioSesionService extends ServiceGeneral<UsuarioSesionEntity> {
    constructor(
        @InjectRepository(UsuarioSesionEntity)
        private readonly _usuarioSesionRepository: Repository<UsuarioSesionEntity>,
    ) {
        super(_usuarioSesionRepository);
    }
}
