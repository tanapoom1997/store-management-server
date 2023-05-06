import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { Users, UsersDocument } from 'src/common/database/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: mongoose.Model<UsersDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(payload: any) {
    try {
      const email = payload?.email;
      const password = payload?.password;
      const id = new mongoose.Types.ObjectId().toHexString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await this.userModel.create({
        _id: id,
        email,
        password: hashedPassword,
      });
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email }).lean();
    } catch (err) {
      throw err;
    }
  }

  async generateToken(user: any) {
    try {
      const payload = { email: user?.email, password: user?.password };
      const token = await this.jwtService.signAsync(payload, {
        secret: 'bXlTdG9yZU1hbmFnZW1lbnQyMDIz',
        expiresIn: '1h',
      });
      await this.userModel.updateOne(
        { user: user?.user },
        { $set: { tokens: [token] } },
      );
      return token;
    } catch (err) {
      throw err;
    }
  }
}
