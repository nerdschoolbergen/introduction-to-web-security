import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./src/data/data.sqlite', sqlite3.OPEN_READWRITE, (error) => {
  if (error) {
    throw error;
  }
});

const queryAll = (sql, params) => {
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
  return new Promise(function (resolve, reject) {
    db.get(sql, params, function (error, result) {
      if (error)
        reject(error);
      else
        resolve(result);
    });
  });
};

export const getCandidates = () => {
  return queryAll("SELECT id, name, votes FROM candidate");
}

export const addComment = async ({ userId, comment }) => {
  const user = await queryOne(`SELECT * FROM user WHERE id=${userId}`);
  if (!user) {
    return 
  }

  db.exec(`INSERT INTO comment (author, comment) VALUES ('${user?.username}', '${comment}')`);
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
  db.exec(`
    BEGIN TRANSACTION;

    UPDATE candidate
    SET votes = votes + 1
    WHERE id = ${candidateId};

    UPDATE user
    SET hasVoted = true
    WHERE id = ${userId};

    COMMIT;
  `);
}