import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private UserModel: Model<User>,
        // private jwtservice: JwtService,
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.UserModel.find();
        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.UserModel.findById(id);

        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
    
}
