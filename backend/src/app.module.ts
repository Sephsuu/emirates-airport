import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { connection, Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { CountryModule } from './modules/country.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: "papiverse",
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('MongoDB connected'));
        connection.on('open', () => console.log('MongoDB connection opened'));
        connection.on('disconnected', () => console.log('MongoDB disconnected'));
        connection.on('reconnected', () => console.log('MongoDB reconnected'));
        connection.on('error', (err) => console.error('MongoDB connection error:', err));
        return connection;
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'Papiverse-Auth',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      logging: true,
    }),

    UserModule,
    CountryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}



