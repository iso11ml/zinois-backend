import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email: string

    @IsString()
    @MaxLength(20)
    @MinLength(3)
    name: string

    @MinLength(3)
    @IsString()
    @MaxLength(30)
    lastName: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}