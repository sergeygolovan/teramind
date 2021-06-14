import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  uploadDate: Date;

  @Column({
      type: 'blob'
  })
  data: Buffer;

  @ManyToOne(type => UserEntity, user => user.files)
  owner: UserEntity;
}