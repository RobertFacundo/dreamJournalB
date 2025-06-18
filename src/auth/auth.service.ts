import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(username: string, password: string) {
    const existing = await this.usersRepo.findOne({ where: { username } });
    if (existing) throw new UnauthorizedException('username already exists');

    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hash });
    await this.usersRepo.save(user);
    return this.login(user);
  }

  async login(userOrUsername: string | User, password?: string) {
    let user: User;
    if (typeof userOrUsername === 'string') {
      if (typeof password !== 'string') {
        throw new UnauthorizedException('Password is required');
      }

      const foundUser = await this.usersRepo.findOne({ where: { username: userOrUsername } });
      if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        throw new UnauthorizedException('invalid Credentials');
      }
      user = foundUser;
    } else {
      user = userOrUsername;
    }

    const payload = { sub: user.id };
    return {
      acces_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, hasSeenWelcomeModal: user.hasSeenWelcomeModal },
    };
  }

  async getMe(userId: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('user not found');
    return user;
  }

  async updateUser(userId: number, updateData: Partial<User>) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('user not found');

    Object.assign(user, updateData);
    await this.usersRepo.save(user);

    return {
      id: user.id,
      username: user.username,
      hasSeenWelcomeModal: user.hasSeenWelcomeModal,
    }
  }
}
