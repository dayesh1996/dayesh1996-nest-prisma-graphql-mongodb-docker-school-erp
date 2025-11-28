🎯 SCHOOL ERP — MODULES INCLUDED

We design based on real-world ERP features:

Core Modules

Users (Admins, Teachers, Parents, Students)

Classes / Sections

Subjects

Attendance

Exams & Results

Fees & Payments

Timetable

Library

Transport

Hostel

Inventory

1. FULL ERD (ENTITY RELATIONSHIP DIAGRAM)

Below is a practical ERD used in real-world ERP products:

                 ┌──────────────┐
                 │   USER        │
                 │ id            │
                 │ role          │ (admin/teacher/student/parent)
                 └───────┬──────┘
                         │1:N
                 ┌───────┴────────┐
           ┌─────► STUDENT         │
           │     │ id              │
           │     │ user_id         │
           │     │ class_id        │
           │     └───────┬────────┘
           │             │1:N
           │     ┌───────┴────────┐
           │     │ ATTENDANCE      │
           │     │ id              │
           │     │ student_id      │
           │     │ date            │
           │     │ status          │
           │     └─────────────────┘
           │
           │
           │1:N
┌──────────┴────────┐
│     CLASS          │
│ id                 │
│ name               │
│ section            │
└───────┬───────────┘
        │1:N
        │
┌───────┴──────────┐
│     SUBJECT       │
│ id                │
│ class_id          │
│ name              │
└───────────────────┘


                1:N
  ┌─────────────────────────┐
  │         EXAM            │
  │ id                      │
  │ class_id                │
  │ date                    │
  └───────────┬────────────┘
              │1:N
              │
       ┌──────┴───────────┐
       │     RESULT        │
       │ id                │
       │ exam_id           │
       │ student_id        │
       │ marks             │
       └───────────────────┘


                1:N
  ┌─────────────────────────┐
  │         FEES            │
  │ id                      │
  │ class_id                │
  │ amount                  │
  └───────────┬────────────┘
              │1:N
              │
       ┌──────┴───────────┐
       │   PAYMENT         │
       │ id                │
       │ student_id        │
       │ fees_id           │
       │ amount_paid       │
       └───────────────────┘



##Project setup
1. Create NestJS Project
npm i -g @nestjs/cli
nest new school-erp
cd school-erp
2. Install GraphQL packages
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
3. Install Prisma + MongoDB client
npm install prisma --save-dev
npm install @prisma/client
4. Initialize Prisma
npx prisma init (This create "prisma/schema.prisma and.env")

5. Create Docker Compose file (optional but recommended)
docker-compose.yml (Start MongoDB:)
docker compose up -d

6. Generate Prisma Client
npx prisma generate
Note if get any "Failed to load config file "D:\school-erp" as a TypeScript/JavaScript module. Error: PrismaConfigEnvError: Missing required environment variable: DATABASE_URL" error message then fix or delete prisma.config.ts  inside-> delete("datasource: { url: env("DATABASE_URL"), },") or edit("datasource: {  url: url: "env:DATABASE_URL",},") 
7. Install validation packages:
npm install class-validator class-transformer
8. Add GraphQL Setup in Nest -> app.module.ts

GraphQLModule.forRoot({
  autoSchemaFile: 'schema.gql',
  sortSchema: true,
  playground: true,
})
9. Create Prisma Module & Service
nest g module prisma
nest g service prisma
10. Create Your Feature Modules
nest g module modules/users
nest g resolver modules/users
nest g service modules/users

11. After writing schema For Mongo, prisma migrate isn't used; use prisma db push to synchronize schema.
# format schema (optional but recommended)
npx prisma format

# generate prisma client
npx prisma generate

# push schema to MongoDB (no migrations for Mongo)
npx prisma db push

# open prisma studio (inspect data)
npx prisma studio








## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
