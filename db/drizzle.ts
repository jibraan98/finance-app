// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Client } from 'pg';

// import * as schema from "./schema";

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
// });

// client.connect();

// export const db = drizzle(client, { schema });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema })