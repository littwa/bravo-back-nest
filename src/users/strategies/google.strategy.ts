import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';


type AuthProvider = 'google' | 'facebook';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            //clientSecret: null, // process.env.GOOGLE_SECRET
            callbackURL: 'http://localhost:3000/google/redirect',
            scope: ['email', 'profile'],
            passReqToCallback: true, // 
        }, async (
            req,     // express request object
            access,  // access token from Google
            refresh, // refresh token from Google
            profile, // user profile, parsed by passport
            done
        ): Promise<void> => {
            // transform the profile to your expected shape
            console.log(34343434)
            console.log(req)
            let myProfile: any = { profile, access };
            done(undefined, myProfile);
            // return (async (myProfile) => { await myProfile })(myProfile)
            //     .then(result => done(null, result))
            //     .catch(error => done(error));
        }
        );
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        // console.log(55, [...arguments])
        // console.log(66, accessToken)
        // console.log(77, refreshToken)
        const jwt: string = 'placeholderJWT'

        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        }
        done(null, user);
    }
}