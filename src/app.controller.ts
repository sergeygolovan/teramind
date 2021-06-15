import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { User } from './common/decorators/user.decorator';
import { UserEntity } from './database/entities/user.entity';
import { FilesService } from './files/files.service';
import { CreateUserDTO } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Аутентификация пользователя и выдача ему JWT-токена
   * @param req
   */
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() userDTO: CreateUserDTO, @Req() req) {
    return this.authService.login(req.user);
  }

  /**
   * Регистрация пользователя
   * @param createUserDTO
   * @returns
   */
  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.findOne(createUserDTO.login);

    if (user) {
      throw new BadRequestException(
        `Пользователь с именем ${user.login} уже существует!`,
      );
    }

    try {
      const { password, ...result } = await this.userService.create(createUserDTO);

      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        `При создании пользователя произошла ошибка!`,
      );
    }
  }

  /**
   * Загрузка файла
   * @param fileToUpload
   * @param user
   */
  @ApiBearerAuth()
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() fileToUpload: Express.Multer.File,
    @User() user: UserEntity,
  ) {
    try {
      const isFileExists = user.files.some(
        (file) => file.fileName === fileToUpload.filename,
      );

      if (isFileExists) {
        throw new BadRequestException(
          `Файл ${fileToUpload.originalname} уже загружен в систему!`,
        );
      }

      await this.filesService.create(fileToUpload, user);
    } catch (err) {
      throw new BadRequestException(`Призагрузке файла произошла ошибка!`);
    }
  }

  /**
   * Выгрузка файла пользователю
   * @param requestedFileId
   * @param user
   * @param response
   * @returns
   */
  @ApiBearerAuth()
  @Get('download/:id')
  @UseGuards(JwtAuthGuard)
  async downloadFile(
    @Param('id') requestedFileId: string,
    @User() user: UserEntity,
  ) {
    const isFileCouldBeDownloaded = user.files
      .map((file) => file.id)
      .includes(requestedFileId);

    // Если у пользователя отсутствуют полномочия
    if (!isFileCouldBeDownloaded) {
      throw new BadRequestException(`Запрашиваемый файл не найден`);
    }

    const file = await this.filesService.findOne(requestedFileId);

    if (!file) {
      throw new BadRequestException(`Запрашиваемый файл не найден`);
    }

    return file.data;
  }

  /**
   * Поиск файлов, добавленных конкретным пользователем
   * @param user
   * @returns
   */
  @ApiBearerAuth()
  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getFileList(@User() user: UserEntity) {
    return await this.filesService.findByIds(user.files.map((file) => file.id));
  }
}

