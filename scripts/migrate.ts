// import { neon } from '@neondatabase/serverless';
// import { config } from 'dotenv';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { migrate } from "drizzle-orm/neon-http/migrator";

// config({ path: ".env.local" });

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql);

// const main = async () => {
//     try {
//         await migrate(db, { migrationsFolder: "drizzle" })
//     } catch (error) {
//         console.log("Error during migration", error);
//         process.exit(1);
//     }
// }

// main();

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';

config({ path: '.env.local' });

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

const main = async () => {
    try {
        await client.connect(); // Connect to the database
        await migrate(db, { migrationsFolder: 'drizzle' });
        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Error during migration', error);
        process.exit(1);
    } finally {
        await client.end(); // Disconnect from the database
    }
};

main();
