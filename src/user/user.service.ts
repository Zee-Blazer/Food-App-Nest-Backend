import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity'; // User Entity

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
}
