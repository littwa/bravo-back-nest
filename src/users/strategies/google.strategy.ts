import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { HttpService, Injectable } from '@nestjs/common';

// import { config } from 'dotenv';
// type AuthProvider = 'google' | 'facebook';
// config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private httpService: HttpService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            callbackURL: 'http://localhost:3000/users/google-auth/redirect',
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }

    async validate(req: any, accessToken: string, refreshToken: string, profile, done: VerifyCallback): Promise<any> {

        // console.log(66, accessToken);
        // console.log(77, refreshToken);
        // console.log(88, profile);
        //const jwt: string = 'placeholderJWT'
        // this.httpService.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + accessToken).subscribe(d => console.log(888, d))

        const { name, emails, photos, id } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            sub: id,
            accessToken,
            profile
        }
        done(null, user);
    }
}