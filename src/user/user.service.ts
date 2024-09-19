import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from "bcrypt"; // Hashing password
import { JwtService } from '@nestjs/jwt'; // Assigning tokens
import { MailerService } from '@nestjs-modules/mailer'; // Node Mailer to send email

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,
        private mailService: MailerService
    ) {}

    // Created the signup functionality
    async createNewUser(username: string, email: string, password: string) {

        // Queries for the email and the username
        const checkUser = await this.repo.findOneBy({ email });
        const checkUsername = await this.repo.findOneBy({ username });

        // Responds with error if the username or email already exists
        if(checkUser || checkUsername) throw new NotAcceptableException("Email or Username already exists!");

        // Hashs the password with a given salt
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT));

        // Creates the user for storage
        const user = this.repo.create({username, password: hash, email});

        try{
            this.mailService.sendMail({
                from: 'The Smart Coder <the.smart.coder@gmail.com>',
                to: 'ganiyu.bolaji.bo@gmail.com',
                subject: `How to Send Emails with Nodemailer`,
                text: "This is to indicate that you just registered an account with us",
            })
        } catch(err) {
            throw new BadRequestException("Didn't go through!");
        }

        // Saves the created user in the DB
        return this.repo.save(user);
    }

    // Created the Login functionality
    async loginUser(email: string, password: string) {

        // Query for a user with the given email
        const user = await this.repo.findOneBy({ email }); 

        // Confirms if user exists
        if(!user) throw new NotFoundException("User not found. Check email and try again!");

        // Compare the password writen with the password in the DB
        const isMatch = await bcrypt.compare(password, user.password);

        // Condition to responsed if it's not a match
        if(!isMatch) throw new UnauthorizedException("Check password and try again!");

        // The data structure for the Token
        const payload = { id: user.id, username: user.username };

        // return the access token to be stored
        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
