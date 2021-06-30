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
    const { uid: _id, email, role } = payload;
    return { _id, email, role }; // request.user ?
  }
}
