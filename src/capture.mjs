import fetch from "node-fetch";
import { getDb } from "./jsondb.mjs";
const baseUrl = "https://swapi.dev/api/";

function captureResource(key, url, db) {
  fetch(url)
    .then((data) => data.json())
    .then((json) => {
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
        captureResource(key, json.next, db);
      }
    });
}

function start(folder = "db", file = "swapi.json") {
  const db = getDb(folder, file);
  fetch(baseUrl)
    .then((data) => data.json())
    .then((json) => {
      db.set("resources", json);
      Object.keys(json).forEach((key) => {
        db.set(key, []);
        captureResource(key, json[key], db);
      });
    });
}

export { start };
