import { Injectable } from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";

@Injectable()
export class UsuarioService extends ServiceGeneral<UsuarioEntity> {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
        super(_usuarioRepository);
    }
}