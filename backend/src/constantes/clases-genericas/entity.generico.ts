import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class EntityGenerico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_At',
    type: 'datetime',
    nullable: true,
  })
  createdAt: string;

  @Column({
    name: 'updated_At',
    type: 'datetime',
    nullable: true,
  })
  updatedAt: string;
}
