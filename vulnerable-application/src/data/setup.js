import sqlite3 from "./sqlite.js";
import { seedSql } from "./seed.js";

const setupDb = () => {
  const db = new sqlite3.Database("./src/data/data.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error) {
      console.log(error);
    }
  });
  db.exec(seedSql);
}

setupDb();
