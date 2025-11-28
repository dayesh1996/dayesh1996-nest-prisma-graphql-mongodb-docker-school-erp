import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { FeesModule } from './modules/fees/fees.module';
import { ExamsModule } from './modules/exams/exams.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    UsersModule,
    StudentsModule,
    AttendanceModule,
    FeesModule,
    ExamsModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
