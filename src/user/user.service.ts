import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private bancoDeDados: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    if (user.password !== user.passwordConfirmation) {
      throw new UnauthorizedException({
        statusCode: 402,
        message: 'Senhas não são compatíveis',
      });
    }

    this.bancoDeDados.push(user);
    const aux = this.bancoDeDados.map((user) => ({
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));
    return aux;
  }

  read(id: string) {
    const encontrei = this.bancoDeDados.find((user) => user.id === id);

    if (encontrei === undefined) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Usuário não encontrado',
      });
    }
    return encontrei;
  }
}
