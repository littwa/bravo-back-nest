import { BadRequestException, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ERole } from "../shared/enums/role.enum";
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './dto/creta-user.dto'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private emailService: EmailService, private jwtService: JwtService) { }

    async createUserManager(createUserDto: createUserDto): Promise<User> {

        let userManager = await this.userModel.findOne({ email: createUserDto.email });

        if (!userManager) {
            userManager = await this.userModel.create({
                ...createUserDto,
            });
        }

        const code = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

        const updatedUserManager = await this.userModel.findByIdAndUpdate(
            userManager._id,
            { verificationCode: code },
            { new: true, useFindAndModify: false },
        );

        this.emailService.sendUserConfirmation(updatedUserManager.email, updatedUserManager.verificationCode)

        return updatedUserManager;

    }

    async verifycationManager(param) {
        try {
            const { verificationCode } = param;
            const mangerForVerification = await this.userModel.findOneAndUpdate(
                { verificationCode },
                {
                    verificationCode: "",
                },
                { new: true, useFindAndModify: false },
            );



            if (!mangerForVerification) {
                throw new BadRequestException("No mangerForVerification")
            }

            const accessToken = this.jwtService.sign(
                {
                    mid: mangerForVerification._id,
                    secret: process.env.TOKEN_SECRET,
                    email: mangerForVerification.email,
                    role: mangerForVerification.role
                },
                // { expiresIn: "30d" },
            );

            return {
                email: mangerForVerification.email,
                token: accessToken,
            };

        } catch (err) {
            throw new BadRequestException("Error")
        }
    };

    // async authorize(payload) {

    //     let userManager = await this.userModel.findOne({ _id: payload.mid });




    //     // console.log("-------authorize----")

    //     return userManager
    //     // if (!token) {
    //     //     return null;
    //     // }

    //     // let parsedToken;

    //     // try {
    //     //     // parsedToken = await this.jwtService.verify(token, process.env.TOKEN_SECRET);
    //     //     parsedToken = await this.jwtService.verify(token)
    //     // } catch (err) {
    //     //     return null;
    //     // }

    //     // let manager = await this.userModel.findOne({ _id: parsedToken.mid });

    //     // if (!manager) {
    //     //     return null;
    //     // }

    //     // return manager;

    // }




    // if (isExistіn) {
    //     throw new NotAcceptableException("email is existіn")
    //     //throw new HttpException("email is existіn", HttpStatus.NOT_ACCEPTABLE); // Analog
    // }


}