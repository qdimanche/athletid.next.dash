import { db } from "@/lib/db";

async function main() {
    const randomString = Math.random().toString(12).substring(11);

    const user = await db.user.upsert({

        where: { email: "aaaaa@email.com" },
        update: {},
        create: {
            email: "aaaaa@email.com",
            firstName: "User",
            lastName: "Person",
            password: "password",
            posts: {
                create: new Array(5).fill(1).map((_, i) => ({
                    name: `Project ${i}`,
                    category: `Project ${i}`,
                })),
            },
        },
        include: {
            posts: true,
        },
    });

    console.log({ user });
}
main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });