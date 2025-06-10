import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connection, Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/', {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('MongoDB connected'));
        connection.on('open', () => console.log('MongoDB connection opened'));
        connection.on('disconnected', () => console.log('MongoDB disconnected'));
        connection.on('reconnected', () => console.log('MongoDB reconnected'));
        connection.on('error', (err) => console.error('MongoDB connection error:', err));
        return connection;
      },
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}



