import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from "bcrypt";

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async createNewUser(username: string, email: string, password: string) {
        const checkUser = this.repo.findOneBy({ email });

        if(checkUser) throw new NotAcceptableException("Email already exists!");

        const strongPass = `${password}_${process.env.HASH_PASS}`;
        const hash = await bcrypt.hash(strongPass, parseInt(process.env.SALT));
        const user = this.repo.create({username, password: hash, email});

        return this.repo.save(user);
    }

    async loginUser(email: string, password: string) {
        const user = await this.repo.findOneBy({ email });

        if(!user) throw new NotFoundException("Check email and try again!");

        const isMatch = await bcrypt.compare(password, user.password);
        console.log()

        if(!isMatch) throw new UnauthorizedException("Check password and try again!");

        return user;
    }
}
