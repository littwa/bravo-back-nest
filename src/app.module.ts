import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from "./shared/configs/base.config"

// import { User, UserSchema } from './users/user.schema';
import { UsersModule } from './users/users.module';


@Module({
  imports: [MongooseModule.forRoot(MONGO_URL),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// mongodb+srv://adminik:7891ly1987@cluster-mongodb.mqnmf.mongodb.net/db-bravo?retryWrites=true&w=majority
// mongodb://localhost/nest

// MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
// , { connectionName: 'users' }