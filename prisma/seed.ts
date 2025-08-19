import { prisma } from "@/prisma";

async function seed() {
    await prisma.user.createMany({
        data: [
            {
                name: "Rodirgo teste",
                email: "user1@example.com",
            },
            {
                name: "Julia teste",
                email: "user2@example.com",
            },
        ],
    });
}

seed().then(() => {
    console.log("Database seeded successfully");
    prisma.$disconnect();
});
