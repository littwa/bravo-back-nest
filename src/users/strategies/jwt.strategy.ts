import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ConfigJwtOptions } from 'src/app/shared/interfaces/config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  validate(payload: any) {
    const { mid: _id, email, role } = payload;
    console.log(4444444, { _id, email, role })
    return { _id, email, role };
  }
}
