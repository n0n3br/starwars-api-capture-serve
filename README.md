# StarWars API Capture and Local Serve

## Description

This library capture all data from Star Wars API (https://swapi.dev/) and serve it locally.

---

## Content

<!--ts-->

- [About](#about)
- [Requirements](#requirements)
- [Instalation](#instalation)
- [How to use](#how-to-use)
- [Author](#mantainers)
<!--te-->

---

## About

I made this library to use the Star Wars API in my learning projects without having to deal with the official api rate limit.

All the data is captured and stored in a JSON file and then served with the [JSON Server](https://www.npmjs.com/package/json-server) library.

The official url's from the official api are replaced with the localhost:port syntax to make all the navigation between links local.

The standard folder where the resulting json is stored is db, the default filename is swapi.json and the default serve port is 3000.

---

## Requirements

To use this library you must have [NodeJS](https://nodejs.org/en/) installed in your machine.

---

## Instalation

To install the library use npm:

```
npm install @n0n3br/starwars-api-capture-serve
```

---

## How to use

Create a folder to host your project

```console
mkdir my-project
```

Run the npm init command

```console
cd my-project
npm init -y
```

Install the library

```console
npm i @n0n3br/starwars-api-capture-serve
```

create a index.mjs file and write your script

```javascript
import fs from "fs";
import path from "path";

import { capture, serve } from "@n0n3br/starwars-api-capture-serve";

const dbFolder = "db";
const dbFile = "swapi.json";
const port = 3000;

// optional - check if the database file already exists
// you can always capture a new database before serving, but you may have trouble wth the rate limit
const dbPath = path.resolve(".", dbFolder, dbFile);
if (!fs.existsSync(dbPath)) {
  // Capture function parameters are optional. If not informed, 'db' and 'swapi.json' values will be used
  capture(dbFolder, dbFile);
}
// serve the resulting data
// Serve function parameters are optional. If not informed 'db', 'swapi.json' and 3000 values will be used
serve(dbFolder, dbFile, port);
```

An usage example can also be found in the example folder

---

## Author

<div style='text-align:center'>
  <a href="https://github.com/n0n3br" style='margin-bottom:10px'>
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/371808?s=400&v=4" width="100px;" alt=""/>
    <br />
    <sub><b>Rogerio Amorim</b></sub>
  </a>
  <br />
  <br />
  <a href='https://www.linkedin.com/in/rogeriolaamorim/'>
    <img src='https://img.shields.io/badge/-Rogerio-blue?style=flat-square&logo=Linkedin&logoColor=white' />
  </a>
</div>
