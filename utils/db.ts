import { PrismaClient } from "../app/generated/prisma/client";
// import { adapter } from "next/dist/server/web/adapter";
import { connection } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
// // import { env } from 'process';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEXT_PRIVATE_DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });



// const { Pool } = pg;
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL
// });

// const prismaClientSingleton = () => {
//   return new PrismaClient({ adapter })
// }
declare global {
  var prisma: PrismaClient | undefined;
}

// Create connection pool
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);

// Create singleton client
// declare const globalThis: {
//   prismaGlobal: ReturnType <typeof prismaClientSingleton>
// } & typeof global

const prismaGl = global.prisma ?? new PrismaClient({ adapter });

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton
// In development, assign to global to reuse across hot reloads
if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaGl;
}

export default prisma;