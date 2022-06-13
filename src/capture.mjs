import fetch from "node-fetch";
import { getDb } from "./jsondb.mjs";
const baseUrl = "https://swapi.dev/api/";

async function captureResource(key, url, db) {
  console.info(`capturing ${url}`);
  const rawData = await fetch(url);
  const json = await rawData.json();
  if (!db.has(key)) {
    db.set(key, []);
  }
  db.set(
    key,
    [...db.get(key), ...json.results].map((item, n) => ({
      id: n + 1,
      ...item,
    }))
  );
  if (json.next) {
    await captureResource(key, json.next, db);
  }
}

async function start(folder = "db", file = "swapi.json") {
  const db = getDb(folder, file);
  console.info(`capturing root resources`);
  const rawData = await fetch(baseUrl);
  const json = await rawData.json();
  db.set("resources", json);
  db.sync();
  const keys = Object.keys(json);
  for (const key of keys) {
    db.set(key, []);
    await captureResource(key, json[key], db);
  }
}

export { start };
