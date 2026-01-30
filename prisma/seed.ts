// const { PrismaClient } = require('@prisma/client');
import { PrismaClient } from "../app/generated/prisma/client";  
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import products from './products.json' with { type: 'json' };   
// const products = require('./products.json');
// We create a new instance of the Prisma Client
// const prisma = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL, // or use an adapter like @prisma/adapter-planetscale
// });
// export default prisma;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // We are iterating over & creating the product
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}
// We just invoke main & we diconnect if we are successful
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });