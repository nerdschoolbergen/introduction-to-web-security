# Exercise 6 - SQL injection continued

In this exercise, we will look at some more complicated examples of SQL injection.

## 6.1 - Extract the user table schema

:pencil2: Log out and log in using with the following username

```sql
' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--
```

:pencil2: Inspect the source of the voting page. Do you see anything questionable?

:pencil2: Look at the source code. Try to reason on _how_ we are able to extract table schemas using SQL injection.

:star: Bonus: Can you change the login query to execute some arbitrary SQL to steal information?

## Get a user's password

The developers of this solution has not followed any good practices, and has stored the passwords as clear text!

:pencil2: Try to use a similar technique as in the previous task to extract a users password.

## Hints

<details>
  <summary>Hint 1</summary>
The login form is still vulnerable. Focus on the username field. A single quote should break the query.
</details>

<details>
  <summary>Hint 2</summary>
  Figure out how many columns (and their names) the original SELECT returns. Observe what the app displays after login (e.g. an "id"?). You only need to return one column matching that expected name/type.
</details>

<details>
  <summary>Hint 3</summary>
  If the original query selects a column named `id`, your injected SELECT must output a column aliased to `id` so the application code continues without errors.
</details>

<details>
  <summary>Hint 4</summary>
  SQLite exposes table creation statements in `sqlite_schema` (older: `sqlite_master`). Use `GROUP_CONCAT(sql)` to merge rows into one string so it fits a single-column UNION.
</details>

<details>
  <summary>Hint 5</summary>
  Terminate the rest of the original query using `--` (and maybe a trailing space).
</details>

<details>
  <summary>Hint 6</summary>
  Once you know the users table name and columns, you can concatenate username and password fields with the string concatenation operator `||` inside `GROUP_CONCAT`.
</details>

### [Go to exercise 7 :arrow_right:](../exercise-7/README.md)
