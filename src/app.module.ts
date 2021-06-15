import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constansts';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './files/common/multerOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserEntity } from './database/entities/user.entity';
import { FileEntity } from './database/entities/file.entity';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "src/database/database.sqlite",
      synchronize: true,
      entities: [UserEntity, FileEntity]
    }),
    MulterModule.register(multerOptions),
    PassportModule,
    AuthModule,
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}
// export class AppModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer): void {
//     consumer.apply(JsonBodyMiddleware).forRoutes('*');
//   }
// }
