import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Redirect, Req, Res, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ERole } from 'src/shared/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './authorization/roles.decorator';
import { RolesGuard } from './authorization/roles.guard';


// const passport = require('passport');
// import * as passport2 from 'passport';
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

@Controller('google')
export class AuthGoogleController {
    constructor(private readonly userService: UsersService) { }
    // @Get("g")
    // @UseGuards(AuthGuard('google'))
    // async googleAuth(@Req() req) {
    //     console.log(33, req)
    // }

    // @Get(':provider(google|facebook)')
    // async handleOauthRequest(
    //   @Req() req: Request,
    //   @Res() res: Response,
    //   @Next() next: NextFunction,
    //   @Param('provider') provider: AuthProvider
    // ) {
    //   const params = {
    //     session: false,
    //     scope: ['<specify scope base on provider>'],
    //     callbackURL: `<domain>/auth/${provider}/callback`,
    //   };
    //   authenticate(provider, params)(req, res, next);
    // }


    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log(33, req)
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Query("code") code: string) {
        console.log(44, req.user, code)
        return this.userService.googleLogin(req)
    }

    @Get("test")
    @UseGuards(AuthGuard('google'))
    async testGoogleAuth(@Req() req, @Query("code") code: string) {
        console.log("req.user-", req.user)
        console.log("code---", code)
        return req.user
    }
}

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {
        // console.log(11, passport)
        // console.log(22, passport2)
    }

    //-----------Test-OAuth-Start-------


    // @Get('redirect')
    // @UseGuards(AuthGuard('google'))
    // googleAuthRedirect(@Req() req) {
    //     console.log(44, req)
    //     return this.userService.googleLogin(req)
    // }

    // @Get("/auth/google/callback")
    // @HttpCode(HttpStatus.OK)
    // oAuthGoogleCallback() {
    //     passport.authenticate('google', { failureRedirect: '/login' }),
    //         function (req, res) {
    //             console.log(777, req)
    //             res.status(200).send(res);
    //             // res.redirect('/');
    //         }
    // }
    //-----------Test-OAuth-End---------

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