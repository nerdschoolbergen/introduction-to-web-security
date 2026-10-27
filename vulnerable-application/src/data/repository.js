import { existsSync } from "fs";
import sqlite3 from "./sqlite.js";
import { seedSql } from "./seed.js";

const dbPath = './src/data/data.sqlite';
const isNewDb = !existsSync(dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
  if (error) {
    throw error;
  }
});

// Create and seed the database the first time the app starts
if (isNewDb) {
  db.exec(seedSql);
}

// Log every query the app sends to the database (whitespace collapsed to keep it on one line)
const logQuery = (sql, params) => {
  const query = sql.replace(/\s+/g, " ").trim();
  console.log(params?.length ? `sql: ${query}  params: ${JSON.stringify(params)}` : `sql: ${query}`);
};

const queryAll = (sql, params) => {
  logQuery(sql, params);
  return new Promise(function (resolve, reject) {
    db.all(sql, params, function (error, rows) {
      if (error)
        reject(error);
      else
        resolve(rows);
    });
  });
};


const queryOne = (sql, params) => {
  logQuery(sql, params);
  return new Promise(function (resolve, reject) {
    db.get(sql, params, function (error, result) {
      if (error)
        reject(error);
      else
        resolve(result);
    });
  });
};

const execute = (sql) => {
  logQuery(sql);
  return new Promise(function (resolve, reject) {
    db.exec(sql, function (error) {
      if (error)
        reject(error);
      else
        resolve();
    });
  });
};

export const getCandidates = () => {
  return queryAll("SELECT id, name, votes FROM candidate");
}

export const getHasUserVoted = async (userId) => {
  try {
    const user = await queryOne(`SELECT * FROM user WHERE id=${userId}`);
    return user?.hasVoted === 1;
  } catch {
    return false;
  }
}

export const addComment = async ({ userId, comment }) => {
  const user = await queryOne(`SELECT * FROM user WHERE id=${userId}`);
  if (!user) {
    return
  }

  ``
  await execute(`INSERT INTO comment (author, comment) VALUES ('${user?.username}', '${comment}')`);
}

export const getUserIdByCredentials = async ({ username, password }) => {
  const result = await queryOne(`SELECT id FROM user WHERE username='${username}' AND password='${password}'`);
  return result?.id;
}

export const getUsers = async () => {
  return queryAll("SELECT * from user");
}

export const getComments = async () => {
  return queryAll("SELECT * from comment");
}

export const vote = async ({ userId, candidateId }) => {
  try {
    await execute(`
      BEGIN TRANSACTION;

      UPDATE candidate
      SET votes = votes + 1
      WHERE id = ${candidateId};

      UPDATE user
      SET hasVoted = true
      WHERE id = ${userId};

      COMMIT;
    `);
  } catch (error) {
    // Don't leave the transaction open if one of the statements failed
    await execute("ROLLBACK").catch(() => {});
    throw error;
  }
}
