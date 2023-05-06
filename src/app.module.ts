import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs/logs.controller';
import { Logs, LogsSchema } from './common/database/schemas/logs.schema';
import { LogsService } from './logs/logs.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import * as mongoose from 'mongoose';
import * as MongoosePagination from 'mongoose-paginate';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { Users, UsersSchema } from './common/database/schemas/users.schema';
import * as dotenv from 'dotenv' 

dotenv.config()

const dbConnection = MongooseModule.forRootAsync({
  useFactory: async () => {
    return {
      uri: 'mongodb://myStoreManagement2023:myStore2023@localhost:27017/store-management',
      connectionFactory: async (connection) => {
        if (!connection) {
          throw new Error('Can not connect to database');
        } else {
          connection.plugin(MongoosePagination);
          return connection;
        }
      },
    };
  },
});

@Module({
  imports: [
    dbConnection,
    MongooseModule.forFeature([{ name: Logs.name, schema: LogsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [
    AppController,
    LogsController,
    LoginController,
    UsersController,
  ],
  providers: [AppService, LogsService, LoginService, JwtService, UsersService],
})
export class AppModule {}
