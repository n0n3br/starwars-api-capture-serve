import { capture, serve } from "../index.mjs";
import fs from "fs";
import path from "path";

const folder = "db";
const file = "swapi.json";
const port = 3000;

const filePath = path.resolve(".", folder, file);

if (!fs.existsSync(filePath)) {
  capture(folder, file);
}
serve(folder, file, port);
