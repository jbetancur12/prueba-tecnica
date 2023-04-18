import { DataSource } from "typeorm";
require('dotenv').config()
import { User } from "./entities/user.entity";


export const AppDataSource = new DataSource({
  type: "postgres",
  host:  process.env.PGHOST,
  port: 5432,
  username:  process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
});