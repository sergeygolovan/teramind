import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<any> {
    const user = new UserEntity();

    user.login = createUserDto.login;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }
  
  async findOne(userName: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
        where: [ { login: userName } ]
    });
  }
}