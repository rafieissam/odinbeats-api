import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import SONGS from './seed_data/songs';
import USERS from './seed_data/users';

const prisma = new PrismaClient();

async function main() {
    const song = await prisma.song.createMany({
        data: SONGS,
    });

    let users = [];
    for (let i in USERS) {
        users.push(USERS[i]);
        users[i].password = await bcrypt.hash('New_Pass123', 10);
    }

    const user = await prisma.user.createMany({
        data: users,
    });

    console.log(`Created ${song.count} songs!`);
    console.log(`Created ${user.count} users!`);
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })