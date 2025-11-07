import pkg from pg;
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pkg;

const pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host:process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

export default pool;