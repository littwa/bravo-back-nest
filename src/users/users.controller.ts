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

    @Post()
    @HttpCode(HttpStatus.CREATED)
    postSignUpUser(@Body() body): any {
        switch (body.role) {
            case ERole.Manager:
                return this.userService.createUserManager(body)
            case ERole.Customer:
                return this.userService.createUserManager(body)
            case ERole.Admin:
                return this.userService.createUserManager(body)
            default:
                return new BadRequestException("unknown role")
        }
    }

    @Get("manager/:verificationCode")
    @HttpCode(HttpStatus.OK)
    getVerifycationUser(@Param() param): any {
        return this.userService.verifycationManager(param)
        // switch (body.role) {
        //     case ERole.Manager:
        //         return this.userService.verifycationManager(param)
        //     case ERole.Customer:
        //         return this.userService.verifycationManager(param)
        //     case ERole.Admin:
        //         return this.userService.verifycationManager(param)
        //     default:
        //         return new BadRequestException("unknown role")
        // }
    }

    //=========================================================
    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Roles(ERole.Manager)
    getCurrentMeneger(@Request() req) {
        return req.user;
    }

        // @Get()
        // @UseGuards(AuthGuard('local'))
        // async getCurrentMeneger(@Request() req) {
        //     // return "testGetauth"
        //     return req.user;
        // }
    //============================================================

    // @Get(':id')
    // getOneTestRestuct(@Param('id') id): string {
    //     return 'getOneTestRestuct ' + id;
    // }

    // @Get(':id')
    // getOneTest(@Param() params): string {
    //     return 'getOneTest' + params.id;
    // }

    // @Put()
    // @HttpCode(HttpStatus.CREATED)
    // @Header("AnyHeader", "any_header_text")
    // putOneTest() {
    //     return 'HttpStatusTest';
    // }

    // @Patch()
    // testNativeExpress(@Res() res, @Req() req) {
    //     res.status(201).send({ q: 9 });
    // }

}