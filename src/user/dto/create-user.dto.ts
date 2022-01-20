export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  phone: number;
  birthday: string;
  password: string;
  passwordConfirmation: string;
}
