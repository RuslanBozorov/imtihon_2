import { Pool } from "pg";
import {config} from "dotenv";
config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,              
  port: Number(process.env.DB_PORT) 
}); 

async function db_connect() {
  try {
    await pool.connect();
    console.log("✅ Database ulandi");
  } catch (error) { 
    console.log("❌ Databasada xatolik:", error.message); 
  }
} 

db_connect();

export default pool;
