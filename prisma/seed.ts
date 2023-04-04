import { db } from "@/lib/db";
import { POST_STATUS } from "@prisma/client";

const getRandomPostStatus = () => {
    const statuses = [
        POST_STATUS.PUBLISHED,
        POST_STATUS.DRAFT,
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

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
                    status: getRandomPostStatus(),
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