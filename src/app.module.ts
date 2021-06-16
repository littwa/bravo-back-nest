import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './users/user.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://adminik:7891ly1987@cluster-mongodb.mqnmf.mongodb.net/db-bravo-nest?retryWrites=true&w=majority'), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// mongodb+srv://adminik:7891ly1987@cluster-mongodb.mqnmf.mongodb.net/db-bravo?retryWrites=true&w=majority
// mongodb://localhost/nest