import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Redirect, Req, Res, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ERole } from 'src/shared/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './authorization/roles.decorator';
import { RolesGuard } from './authorization/roles.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

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