import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/database/entities/file.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
  ) {}

  async create(fileToUpload, user: UserEntity): Promise<any> {
    const file = new FileEntity();

    file.fileName = fileToUpload.filename;
    file.uploadDate = new Date();
    file.data = fileToUpload.boffer;
    file.owner = user;
    
    return this.filesRepository.save(file);
  }

  async findByIds(ids: any[]): Promise<FileEntity[]> {
    return this.filesRepository.findByIds(ids);
  }

  async findOne(id: string): Promise<FileEntity> {
    return this.filesRepository.findOne(id);
  }
}
