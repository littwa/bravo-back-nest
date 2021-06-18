import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.TOKEN_SECRET
        })
    }), SharedModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
