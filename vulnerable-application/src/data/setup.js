import sqlite3 from "sqlite3";

const sql = `
  drop table if exists candidate;
  drop table if exists user;

  create table candidate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text not null,
    votes text not null default 0
  );

  create table user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text not null,
    password test not null,
    hasVoted bool not null default false
  );

  insert into user (username, password) 
  values ('jim_raynor', 'terran_rox'),
         ('sarah_kerrigan', 'zergs_r0ckz'),
         ('zeratul', 'hunter3'),
         ('user', 'user');

  insert into candidate (name)
  values ('Isabel Evans'),
         ('Eleanor Wheeler'),
         ('Charlie McCarthy'),
         ('Michael Gardner');
`;

const setupDb = () => {
  const db = new sqlite3.Database("./data.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error) {
      console.log(error);
    }
  });
  db.exec(sql);
}

setupDb();
