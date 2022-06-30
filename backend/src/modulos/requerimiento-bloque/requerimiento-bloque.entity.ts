import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloqueEntity } from '../bloque/bloque.entity';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';

@Entity('requerimiento-bloque')
export class RequerimientoBloqueEntity extends EntityGenerico {
  @ManyToOne((type) => BloqueEntity, (bloque) => bloque.requerimientoBloque, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  bloque: number | BloqueEntity;

  @ManyToOne(
    (type) => RequerimientoEntity,
    (requerimiento) => requerimiento.requerimientoBloque,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  requerimiento: number | RequerimientoEntity;

  // @ManyToOne(
  //     type => EntidadSesionEntity,
  //     entidad2 => entidad2.entidad)
  // entidad2: Entidad2Entity | number;
}
