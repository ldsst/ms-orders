import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { OrdersModule } from './order/order.module';
import { HealthModule } from './health.module';
import { RavenInterceptor, RavenModule } from 'nest-raven';

const pgHost = process.env.PG_HOST;
const pgPort: number = parseInt(process.env.PG_PORT, 10) || 5432;
const pgUser = process.env.PG_USER;
const pgPass = process.env.PG_PASSWORD;
const pgDatebase = process.env.PG_DATABASE;

const natsHost = process.env.NATS_HOST || 'localhost';
const natsPort = process.env.NATS_PORT || 4222;

@Module({
  imports: [
    RavenModule,
    HealthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pgHost,
      port: pgPort,
      username: pgUser,
      password: pgPass,
      database: pgDatebase,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: process.env.LOGGING === 'true' ? true : false,
      schema: 'arbwallet',
    }),
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
  ],
})
export class AppModule {}
