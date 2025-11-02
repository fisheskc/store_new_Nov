const { PrismaClient } = require('@prisma/client');
const products = require('./products.json');
const prisma = new PrismaClient();

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