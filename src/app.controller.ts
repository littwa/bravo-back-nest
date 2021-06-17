import { Controller } from '@nestjs/common';


@Controller()
export class AppController {

  constructor() { }

  // constructor(private readonly appService: AppService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

  // async create(createUserDto: any): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save()
  //   // const createdUser = this.userModel.create(createUserDto);
  //   // return createdUser;
  // }

  // @Post()
  // postTest(@Body() body): any {
  //   this.create({
  //     name2: "ooo",
  //     age: "44",
  //     breed: "qwe"
  //   })
  //   return body.q + 3;
  // }

  // @Get()
  // @Redirect('https://google.com')
  // getRedirectOneTest() {
  //   return 'Redirect-google';
  // }

  // @Get()
  // getHello(): string {
  //   return 'getHello';
  // }

  // @Get(':id')
  // getOneTestRestuct(@Param('id') id): string {
  //   return 'getOneTestRestuct ' + id;
  // }

  // @Get(':id')
  // getOneTest(@Param() params): string {
  //   return 'getOneTest' + params.id;
  // }



  // @Put()
  // @HttpCode(HttpStatus.CREATED)
  // @Header("AnyHeader", "any_header_text")
  // putOneTest() {
  //   return 'HttpStatusTest';
  // }

  // @Patch()
  // testNativeExpress(@Res() res, @Req() req) {
  //   res.status(201).send({ q: 9 });
  // }

  // @Delete()
  // deleteNativeExpress(@Res() res: Response, @Req() req: Request) {
  //   res.status(200).send('deleteNativeExpress')
  //   // return 'deleteNativeExpress'// will not work
  // }
}
