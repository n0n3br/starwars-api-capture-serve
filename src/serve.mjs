import fs from "fs";
import jsonServer from "json-server";
import path from "path";

function replaceUrlApi(dbPath, port) {
  const fileContent = fs.readFileSync(dbPath).toString();
  const newFileContent = fileContent
    .replace(/http:\/\/localhost:(.*?)\//gm, `http://localhost:${port}/`)
    .replace(/"https:\/\/swapi.dev\/api/gm, `"http://localhost:${port}`);
  fs.writeFileSync(dbPath, newFileContent);
}

function start(folder = "db", file = "swapi.json", port = 3000) {
  const dbPath = path.resolve(".", folder, file);
  if (!fs.existsSync(dbPath)) {
    throw new Error(`File ${dbPath} not found. Run capture first`);
  }
  replaceUrlApi(dbPath, port);
  const server = jsonServer.create();
  const router = jsonServer.router(dbPath);
  const middlewares = jsonServer.defaults();
  server.get("/", (req, res) => {
    res.redirect(`/resources`);
  });
  server.use(router);
  server.use(middlewares);
  server.listen(port, () => {
    console.log(`StarWars API listening on port ${port}`);
  });
}

export { start };
