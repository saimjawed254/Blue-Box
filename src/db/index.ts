import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from './schema/schema'

export const sql = neon(process.env.DATABASE_URL!) // i can use this for firing raww queries
export const db = drizzle(sql, {schema}) // for firing through the orm