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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'src/static'
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    MulterModule.register(multerOptions)
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
