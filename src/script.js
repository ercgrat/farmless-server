const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const allTasks = await prisma.task.findMany();
    console.log(allTasks);
}
main().then((val) => {
    console.log(val);
}).catch(e => {
    console.log(e);
});
/*
main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});*/