import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from "bcrypt";

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    // Created the signup functionality
    async createNewUser(username: string, email: string, password: string) {
        const checkUser = await this.repo.findOneBy({ email });
        const checkUsername = await this.repo.findOneBy({ username });

        if(checkUser || checkUsername) throw new NotAcceptableException("Email or Username already exists!");

        const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
        const user = this.repo.create({username, password: hash, email});

        return this.repo.save(user);
    }

    // Created the Login functionality
    async loginUser(email: string, password: string) {
        const user = await this.repo.findOneBy({ email });

        if(!user) throw new NotFoundException("User not found. Check email and try again!");

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) throw new UnauthorizedException("Check password and try again!");

        return user;
    }
}
