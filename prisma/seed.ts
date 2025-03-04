import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pet.createMany({
    data: [
      {
        name: 'Buddy',
        ownerName: 'John Doe',
        age: 3,
        photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGV0fGVufDB8fDB8fHww',
        notes: 'Loves to play fetch.',
      },
      {
        name: 'Mittens',
        ownerName: 'Jane Smith',
        age: 2,
        photo: 'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGV0fGVufDB8fDB8fHww',
        notes: 'Enjoys napping in the sun.',
      },
      {
        name: 'Rex',
        ownerName: 'Alice Johnson',
        age: 5,
        photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBldHxlbnwwfHwwfHx8MA%3D%3D',
        notes: 'Very protective and loyal.',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
