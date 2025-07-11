// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user/user.schema.';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // ✅ Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // ✅ Create a new user
  async create(email: string, hashedPassword: string): Promise<User> {
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  // (Optional) Find user by ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
