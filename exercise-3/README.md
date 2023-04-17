# Exercise 3 - SQL Injection and broken authentication

SQL Injection is a vulnerability that allows an attacker to change queries that an application makes to a database. This can be done by interfering with input sent from the user, which can be interpreted by the server as valid SQL. 

An attacker can retrieve data they are unauthorized to see, as well as performing destructive actions such as deleting or modifying your data.  

[Read more about SQL Injection (owasp.org)](https://www.owasp.org/index.php/SQL_Injection).

![Bobby Tables](../images/bobby_tables.png)

---
Go to the login page (log out if you are logged in). This page has a serious sql-injection vulnerability that will allow you to login as any user. 

## 3.1 SQL Injection in the login form

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

## 3.2 Broken authentication

:pencil2: When you are logged in, take a look at the source of the HTML document of the voting page. See anything taht sticks out? 

<details>
    <summary>Hint 1</summary>
    Something is commented out
</details>


:pencil2: Use the newly discovered information to log in as an arbitrary user. 

### [Go to exercise 5 :arrow_right:](../exercise-5/README.md)