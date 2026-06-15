const { prismaClient } = require("@repo/db/client");

async function main() {
  try {
    const users = await prismaClient.user.findMany();
    console.log("Users in DB:", users);

    // Try to create the user to see the exact error
    try {
        const user = await prismaClient.user.create({
            data: {
                email: "princeagrawal1013@gmail.com",
                password: "testpassword",
                name: "princeagrawal1013"
            }
        });
        console.log("Successfully created user:", user);
    } catch(e) {
        console.error("Failed to create user:", e.message);
    }

  } catch (e) {
    console.error("DB connection error:", e.message);
  } finally {
    await prismaClient.$disconnect();
  }
}

main();
