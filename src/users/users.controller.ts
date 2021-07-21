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
import * as passport from 'passport';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    // Google-auth
    @Get('google-auth')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { console.log(7877878) } // here will be redirect

    @Get('google-auth/redirect')
    @UseGuards(AuthGuard('google'))
    //@Redirect('http://localhost:4200/choicse-customer') // 'http://localhost:4200/choicse-customer'  // google-auth/return
    async googleAuthRedirect(@Req() req, @Res() res, @Body() body) {

        console.log(1000001, req.user);

        const dto = await this.userService.googleLogin(req);
        const qString = Object.entries(dto).reduce((acc, el, i, arr) => { acc = acc + el[0].toString() + "=" + el[1].toString(); if (arr.length - 1 !== i) acc = acc + "&"; return acc }, "");

        return res.redirect(`${process.env.BASE_URL_FRONT_END}/choice-customer?${qString}`);
    }

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

    @Post("up-date/:idCustomer")
    @HttpCode(HttpStatus.OK)
    updateCustomer(@Body() body, @Param() param): any {
        return this.userService.updateUserCustomer(param.idCustomer, body)
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

    @Get("customer/verify/:verificationCode")
    @HttpCode(HttpStatus.OK)
    verifycationCustomer(@Param() param): any {
        return this.userService.verifycationCustomer(param.verificationCode)
    }

    @Post("sign-in")
    signInCustomer(@Body() body) {
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