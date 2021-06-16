import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Next, Param, Patch, Post, Put, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users/user.schema';
import { Model } from 'mongoose';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, @InjectModel(User.name) private catModel: Model<UserDocument>) { }

  async create(createUserDto: any): Promise<User> {
    const createdCat = new this.catModel(createUserDto);
    return createdCat.save();
  }

  @Post()
  postTest(@Body() body): any {
    this.create({
      name: "sds",
      age: "number",
      breed: "fgf"
    })
    return body.q + 3;
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
