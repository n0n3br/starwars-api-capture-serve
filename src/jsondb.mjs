import fs from "fs";
import path from "path";
import JSONdb from "simple-json-db";
const folder = "db";

function getDb(folder, file) {
  const dbPath = path.resolve(".", folder, file);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  const db = new JSONdb(dbPath);
  return db;
}
export { getDb };
