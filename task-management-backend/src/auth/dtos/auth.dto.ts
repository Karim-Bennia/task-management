import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail() // Validate that the email field contains a valid email format
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
