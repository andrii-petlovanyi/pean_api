import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env


export const db = new Client({
    host: PG_HOST,
    port: Number(PG_PORT),
    database: PG_DB,
    user: PG_USER,
    password: PG_PASSWORD,
});