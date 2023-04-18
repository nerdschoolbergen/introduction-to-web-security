# Exercise 3 - SQL Injection

SQL Injection is a vulnerability that allows an attacker to change queries that an application makes to a database. This can be done by interfering with input sent from the user, which can be interpreted by the server as valid SQL. 

An attacker can retrieve data they are unauthorized to see, as well as performing destructive actions such as deleting or modifying your data.  

[Read more about SQL Injection (owasp.org)](https://www.owasp.org/index.php/SQL_Injection).

![Bobby Tables](../images/bobby_tables.png)

---
Go to the login page (log out if you are logged in). This page has a serious sql-injection vulnerability that will allow you to login as any user. 

## 3.1  Exploiting the login form 

:pencil2: Try to find the SQL injection vulnerability and log in with the `user` account without providing a password. 

<details>
    <summary>Hint 1</summary>

    The underlying database is a Sqlite database.
    The code for querying the database for the correct user to login looks like this

    ```js
        SELECT id FROM user WHERE username='${username}' AND password='${password}'
    ```

    See anything suspicious?

</details>

<details>
    <summary>Hint 2</summary>

    Find a way to send in user input that discards any WHERE-clause after the username check, so that only `.. WHERE user=<input>` is evaluated. 

</details>

:pencil2: When you are logged in, look around to see if you can find the username of other people. Try to login as someone else.s

<details>
    <summary>Hint 1</summary>
    Look in the comment section. Some usernames are present here.
</details>

<details>
    <summary>Hint 2</summary>
    Look in the voting page source code. Something is commented out.
</details>

### [Go to exercise 5 :arrow_right:](../exercise-5/README.md)