import { BadRequestException, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types, ObjectId, Schema } from 'mongoose';

import * as mongoose from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ERole, EStatus } from "../shared/enums/role.enum";
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { createUserAdminDto, createUserDto, createUserCustomerDto } from './dto/creta-user.dto'
import { Order, OrderDocument } from 'src/orders/orders.schema';
import * as bcrypt from 'bcrypt';
import { Session, SessionDocument } from './session.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Order.name) private productModel: Model<OrderDocument>,
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
        private emailService: EmailService,
        private jwtService: JwtService) { }

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
            { verificationCode: code, status: EStatus.NotVerified },
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
                    status: EStatus.Verified
                },
                { new: true, useFindAndModify: false },
            );

            if (!mangerForVerification) {
                throw new BadRequestException("No mangerForVerification")
            }

            const accessToken = this.jwtService.sign(
                {
                    uid: mangerForVerification._id,
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

    //===================================================

    async createUserAdmin(createUserAdminDto: createUserAdminDto): Promise<object> {

        let user = await this.userModel.findOne({ email: createUserAdminDto.email, role: ERole.Admin });

        if (user) throw new BadRequestException("User admin with current email is registered")

        const hashPassword = await bcrypt.hash(createUserAdminDto.password, 5);

        const code = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

        user = await this.userModel.create({
            ...createUserAdminDto,
            password: hashPassword,
            verificationCode: code,
            status: EStatus.NotVerified
        });

        this.emailService.sendUserConfirmation(user.email, user.verificationCode)

        const { password, verificationCode, __v, ...userDtoReverse } = user.toObject();

        return userDtoReverse;

    }

    async verifycationAdmin(verificationCode) {

        const adminForVerification = await this.userModel.findOneAndUpdate(
            { verificationCode },
            { verificationCode: "", status: EStatus.Verified },
            { new: true, useFindAndModify: false },
        );

        if (!adminForVerification) throw new BadRequestException("No adminForVerification");

        // const accessToken = this.jwtService.sign(
        //     {
        //         uid: adminForVerification._id,
        //         secret: process.env.TOKEN_SECRET,
        //         email: adminForVerification.email,
        //         role: adminForVerification.role
        //     },
        //     // { expiresIn: "30d" },
        // );

        return {
            email: adminForVerification.email,
            status: adminForVerification.status,
            username: adminForVerification.username,
            role: adminForVerification.role,
            // token: accessToken,
        }; // Redirect on sign-in
    };

    //===================================================================================

    async createUserCustomer(createUserCustomerDto: createUserCustomerDto): Promise<object> { return } ///// TO Work

    //============================================================================================

    async signIn(signInDto) {

        const { email, password } = signInDto;

        const user = await this.userModel.findOne({ email, role: "admin" || "customer" });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user) throw new BadRequestException("User was not found");
        if (!isPasswordValid) throw new BadRequestException("Password wrong");
        if (user.status !== "Verified") throw new BadRequestException("User not verified");

        const userObjectId = Types.ObjectId(user._id); // Check!!!

        console.log(userObjectId);

        const createSession = await this.sessionModel.create({
            uid: userObjectId,
        });

        const accessToken = await this.jwtService.sign(
            {
                sid: createSession._id,
                uid: createSession.uid,
                secret: process.env.TOKEN_SECRET,
                email: user.email,
                role: user.role
            },
            { expiresIn: "2d" },
        );
        const refreshToken = await this.jwtService.sign(
            {
                sid: createSession._id,
                uid: createSession.uid,
                secret: process.env.TOKEN_SECRET,
                email: user.email,
                role: user.role
            },
            { expiresIn: "30d" },
        );

        return {
            user: {
                name: user.username,
                email: user.email,
                status: user.status,
                role: user.role,
            },
            tokens: { accessToken: accessToken, refreshToken: refreshToken },
        }
    };

}