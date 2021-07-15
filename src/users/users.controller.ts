import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Redirect, Req, Res, UseGuards, Request, Query, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { NextFunction, Response, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ERole } from 'src/shared/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './authorization/roles.decorator';
import { RolesGuard } from './authorization/roles.guard';


// const passport = require('passport');
import * as passport from 'passport';
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

@Controller('google')
export class AuthGoogleController {
    constructor(private readonly userService: UsersService) { }

    // @Get()
    // @UseGuards(AuthGuard('google'))
    // async googleAuth(@Req() req) {
    //     console.log(33, req)
    // }

    // @Get('redirect')
    // @UseGuards(AuthGuard('google'))
    // googleAuthRedirect(@Req() req,) {
    //     console.log(44, req.user)
    //     return this.userService.googleLogin(req)
    // }

    // @Post("test")
    // @UseGuards(AuthGuard('google'))
    // async testGoogleAuth(@Req() req, @Query("code") code: string) {
    //     console.log("req.user-", req.user)
    //     console.log("code---", code)
    //     return req.user
    // }
///----------------------------------------------------------------
    // @Get('redirect') // :provider(google|facebook)/callback
    // async handleOauthCallback(
    //     @Req() req,
    //     @Res() res,
    //     @Next() next,
    //     @Param('provider') provider
    // ) {
    //     console.log(121212122212, req.query)
    //     console.log(3434343434, process.env.GOOGLE_CLIENT_ID)
    //     const params = {
    //         // session: true,
    //         state: req.query,
    //         callbackURL: `http://localhost:3000/google/redirect`,
    //         clientID: process.env.GOOGLE_CLIENT_ID,
    //         scope: ['email', 'profile'], // 
    //         // passReqToCallback: true, // 
    //     };

    //     // We use callback here, but you can let passport do the redirect
    //     // http://www.passportjs.org/docs/downloads/html/#custom-callback
    //     passport.authenticate("google", params, (err, user) => {
    //         console.log(2332323232433, user)
    //         if (err) return next(err);
    //         if (!user) return next(new UnauthorizedException());

    //         // I generate the JWT token myself and redirect the user,
    //         // but you can make it more smart.
    //         // this.generateTokenAndRedirect(req, res, user);
    //         return res.status(201).send(user);
    //     })(req, res, next);
    // }
}
//=====================================================================

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log(33, req)
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req,) {
        console.log(44, req.user)
        return this.userService.googleLogin(req)
    }

    //===============================================

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    postSignUpUser(@Body() body): any {
        switch (body.role) {
            case ERole.Admin:
                return this.userService.createUserAdmin(body)
            case ERole.Customer:
                return this.userService.createUserCustomer(body)
            default:
                return new BadRequestException("unknown role")
        }
    }

    @Get("admin/verify/:verificationCode")
    @HttpCode(HttpStatus.OK)
    getVerifycationUser(@Param() param): any {
        return this.userService.verifycationAdmin(param)
    }

    @Get("get")
    @UseGuards(AuthGuard('jwt'))
    getCurrentUser(@Request() req) {
        console.log("req.user-", req.user)
        return req.user;
    }

    //=====================================================

    @Get("customer/verify/:verificationCode")
    @HttpCode(HttpStatus.OK)
    verifycationCustomer(@Param() param): any {
        return this.userService.verifycationCustomer(param.verificationCode)
    }

    @Post("sign-in")
    signUpCustomer(@Body() body) {
        return this.userService.signIn(body);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles(ERole.Admin)
    getCurrentMeneger(@Request() req) {
        return req.user;
    }

    @Get("local")
    @UseGuards(AuthGuard('local'))
    testAuthGuardLocal(@Request() req) {
        return req.user;
    }

    @Get("get/user-customer-info")
    @UseGuards(AuthGuard('jwt'))
    // @Roles(ERole.Admin)
    getCustomer(@Request() req) {
        return this.userService.getInfoUserCustomer(req.user);
    }

    @Get("refresh")
    getRefreshToken(@Req() req) {
        return this.userService.getRefreshToken(req)
    }




}