import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from "bcrypt";

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async createNewUser(username: string, email: string, password: string) {
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT));

        return hash;
    }
}
