
export class createUserDto {

    readonly role: string;

    readonly email: string;

    readonly dateCreated: string

    readonly password?: string;

    readonly firstName?: string;

    readonly lastName?: string;

    readonly verificationCode?: string;

    readonly age?: string;

    readonly avatarURL?: string;

    readonly status?: string;

    readonly verificationToken?: string;

    readonly sessionToken?: string;

}