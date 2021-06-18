import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from "./shared/configs/base.config"

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), MongooseModule.forRoot(process.env.MONGO_URL), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
