import { BadRequestException, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ERole } from "../shared/enums/role.enum";
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private emailService: EmailService, private jwtService: JwtService) { }

    async createUserManager(createUserDto: any): Promise<User> {

        let userManager = await this.userModel.findOne({ email: createUserDto.email });
        if (!userManager) {
            userManager = await this.userModel.create({
                ...createUserDto,
            });
        }

        const code = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

        const { verificationCode } = await this.userModel.findByIdAndUpdate(
            userManager._id,
            { verificationCode: code },
            { new: true, useFindAndModify: false },
        );

        this.emailService.sendUserConfirmation(userManager.email, verificationCode)

        return userManager;

    }

    async verifycationManager(param) {
        try {
            const { verificationCode } = param;
            const mangerForVerification = await this.userModel.findOneAndUpdate(
                { verificationCode },
                {
                    verificationCode: verificationCode,
                },
                { new: true, useFindAndModify: false },
            );

            console.log(verificationCode);
            console.log(mangerForVerification);

            if (!mangerForVerification) {
                throw new BadRequestException("No mangerForVerification")
            }

            console.log(process.env.TOKEN_SECRET)

            // access_token: this.jwtService.sign(payload)
            console.log("-----")
            const accessToken = this.jwtService.sign(
                { mid: mangerForVerification._id, secret: process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "qwerty", },
                // { expiresIn: "30d" },
            );

            console.log(accessToken)
            console.log(mangerForVerification.email)

            return {
                email: mangerForVerification.email,
                token: accessToken,
            };

            // return res.status(200).redirect('http://localhost:3001/managers/test')

        } catch (err) {
            throw new BadRequestException("Error")
        }
    };




    // if (isExistіn) {
    //     throw new NotAcceptableException("email is existіn")
    //     //throw new HttpException("email is existіn", HttpStatus.NOT_ACCEPTABLE); // Analog
    // }


}