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
            case ERole.Manager:
                return this.userService.createUserManager(body)
            case ERole.Customer:
                return "Not implemented temporarily"
            case ERole.Admin:
                return this.userService.createUserAdmin(body)
            default:
                return new BadRequestException("unknown role")
        }
    }

    @Get("manager/verify/:verificationCode")
    @HttpCode(HttpStatus.OK)
    getVerifycationUser(@Param() param): any {
        return this.userService.verifycationManager(param)
    }

    @Get("get")
    @UseGuards(AuthGuard('jwt'))
    getCurrentUser(@Request() req) {
        return req.user;
    }

    //=====================================================


    @Get("admin/verify/:verificationCode")
    @HttpCode(HttpStatus.OK)
    verifycationAdmin(@Param() param): any {
        return this.userService.verifycationAdmin(param.verificationCode)
    }

    @Post("sign-in")
    signUpAdminOrCustomer(@Body() body) {
        return this.userService.signIn(body);
    }

    //======================================================

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles(ERole.Manager)
    getCurrentMeneger(@Request() req) {
        return req.user;
    }

    @Get("local")
    @UseGuards(AuthGuard('local'))
    testAuthGuardLocal(@Request() req) {
        return req.user;
    }

    //============================================================






}