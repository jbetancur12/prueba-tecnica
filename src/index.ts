import app from "./app";
//import { PORT } from "./config";
import { AppDataSource } from "./db";

async function main() {
  try {
    console.log("Initi")
    await AppDataSource.initialize();
    app.listen(3000);
    console.log("Server on port", 3000);
  } catch (error) {
    console.error(error);
  }
}

main();