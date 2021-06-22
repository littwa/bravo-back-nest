import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super()
  }

  // {
  //   // default fields: `username`, `password`
  //   usernameField: 'token',
  // }

  async validate(username: string, password: string) {
    // console.log(username, password)
    return { username, password }
  }

}
