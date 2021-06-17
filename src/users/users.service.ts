import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ERole } from "../shared/enums/role.enum";
import { MailerModule } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(createUserDto: any): Promise<User> {

        // const createdUser = new this.userModel(createUserDto);
        // return createdUser.save();
        //----------------------------------------------------------
        if (createUserDto.role === ERole.Manager) {

        }



        const isExistіn = await this.userModel.findOne(createUserDto.email);
        if (isExistіn) {
            throw new NotAcceptableException("email is existіn")
            //throw new HttpException("email is existіn", HttpStatus.NOT_ACCEPTABLE); // Analog
        }

        // const hashPassword = await bcrypt.hash(req.body.password, 5);

        // const user = await ModelUsers.create({
        //   ...req.body,
        //   password: hashPassword,
        //   avatarURL: process.env.URL + "/images/" + req.file.filename,
        // });

        // Controllers.createAndSendVerifyToken(user._id, req.body.email);

        //----------------------------------------------------------


        //---------------------------------------------------------

        const createdUser = this.userModel.create(createUserDto);
        return createdUser;

    }

    // createAndSendVerifyToken = async (managerId, managerEmail) => {
    //     // const token = uuid.v4();
    //     const code = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

    //     const { verificationCode } = await this.userModel.findByIdAndUpdate(
    //         managerId,
    //         {
    //             verificationCode: code,
    //         },
    //         { new: true, useFindAndModify: false },
    //     );

    //     const transporter = nodemailer.createTransport({
    //         // service: "gmail",
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 587, false for other ports
    //         // requireTLS: true,
    //         auth: {
    //             user: process.env.NODEMAILER_USER,
    //             pass: process.env.NODEMAILER_PASSWORD,
    //         },
    //     });

    //     const mailOptions = {
    //         from: process.env.NODEMAILER_USER,
    //         to: managerEmail,
    //         subject: "Email Verification For Bravo",
    //         html: `<h2>Verification Code: ${verificationCode}</h2>`,
    //     };

    //     return transporter.sendMail(mailOptions);

    // }

}