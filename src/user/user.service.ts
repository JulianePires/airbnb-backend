import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('Já existe um usuário com esse e-mail');
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new ConflictException('Senhas digitadas não conferem');
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    delete (await createdUser).password;

    return createdUser;
  }
}
