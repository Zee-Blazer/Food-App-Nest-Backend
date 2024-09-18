import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from "bcrypt";

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async createNewUser(username: string, email: string, password: string) {
        const strongPass = `${password}_${process.env.HASH_PASS}`;
        const hash = await bcrypt.hash(strongPass, parseInt(process.env.SALT));

        return hash;
    }

    async loginUser(email: string, password: string) {
        const strongPass = `${password}_${process.env.HASH_PASS}`;
        const isMatch = await bcrypt.compare(strongPass, "$2b$10$CdE2rFc6yvq5LwEaq6DudukSrwiMh3HGCqMa9jUhSQgT0ULFHV9m.");

        return isMatch;
    }
}
