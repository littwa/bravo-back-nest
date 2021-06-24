import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from "./shared/configs/base.config"
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/authorization/roles.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), MongooseModule.forRoot(process.env.MONGO_URL), UsersModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}

// {
//   provide: APP_GUARD,
//   useClass: RolesGuard,
// },