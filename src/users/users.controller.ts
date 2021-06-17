// import { Controller } from '@nestjs/common';

// @Controller('users')
// export class UsersController {}


import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    postSignUpUser(@Body() body): any {
        return this.userService.createUser(body)
    }

    @Get()
    @Redirect('https://google.com')
    getRedirectOneTest() {
        return 'Redirect-google';
    }

    @Get()
    getHello(): string {
        return 'getHello';
    }

    @Get(':id')
    getOneTestRestuct(@Param('id') id): string {
        return 'getOneTestRestuct ' + id;
    }

    @Get(':id')
    getOneTest(@Param() params): string {
        return 'getOneTest' + params.id;
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    @Header("AnyHeader", "any_header_text")
    putOneTest() {
        return 'HttpStatusTest';
    }

    @Patch()
    testNativeExpress(@Res() res, @Req() req) {
        res.status(201).send({ q: 9 });
    }

    @Delete()
    deleteNativeExpress(@Res() res: Response, @Req() req: Request) {
        res.status(200).send('deleteNativeExpress')
        // return 'deleteNativeExpress'// will not work
    }
}