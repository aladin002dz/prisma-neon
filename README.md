# Prisma Neon

## Install Prisma

```bash
npm install prisma --save-dev
npm install @prisma/client
```

## Initialize Prisma

```bash
npx prisma init
```

This command initializes a new Prisma project in your current directory by:
- Creating a new `prisma` directory in your project
- Generating a basic `schema.prisma` file inside that directory, which defines your database schema and connection
- Creating a `.env` file in your project root to store your database connection string

The `schema.prisma` file is the core configuration file for Prisma where you'll define your data models and database connection settings. You can also create these files manually instead of using the command if you prefer more control over the initial setup.

## Initialize Neon

on [neon.tech](https://neon.tech) create a new database, and get the connection string, that will look like this:

```
postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public
```

put the connection string in the **`.env`** file
```js
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## Initialize Prisma Client

```bash
npx prisma generate
```

This command generates the Prisma Client based on your schema file. It creates type-safe database queries that your application can use to interact with your database. Run this command after any changes to your schema.

## Initialize Prisma Migrate

```bash
npx prisma migrate dev --name init
```

This command creates and applies database migrations based on changes to your Prisma schema. It generates SQL migration files, updates your database structure, and records the migration in your project history. The `--name init` parameter labels this migration for tracking purposes.

## Initialize Prisma Studio

```bash
npx prisma studio
```

This command launches Prisma Studio, a visual database management interface for your Prisma database. It provides a GUI where you can view, filter, and edit your database records without writing SQL queries. Prisma Studio automatically understands your schema and displays your data in a user-friendly interface, making it an essential tool for development and debugging.
