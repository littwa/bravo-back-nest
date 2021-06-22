import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({ useFactory: () => ({ secret: process.env.TOKEN_SECRET, signOptions: { expiresIn: '60d' } }) }),
        SharedModule,
        PassportModule
    ],
    providers: [UsersService, LocalStrategy, JwtStrategy],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
