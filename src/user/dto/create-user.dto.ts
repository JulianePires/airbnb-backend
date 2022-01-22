import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  passwordConfirmation: string;
}
