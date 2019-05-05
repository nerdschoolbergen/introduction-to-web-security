
# Exercise 4 - SQL Injection

SQL Injection is a vulnerability that allows an attacker to change queries that an application makes to a database. This can be done by interfering with input sent from the user, which can be interpreted by the server as valid SQL. 

An attacker can retrieve data they are unauthorized to see, as well as performing destructive actions such as deleting or modifying your data.  

[Read more about SQL Injection (owasp.org)](https://www.owasp.org/index.php/SQL_Injection).


![Bobby Tables](../images/bobby_tables.png)

---

Go to the leaderboard page at
[http://hack-yourself-first.com/Supercar/Leaderboard](http://hack-yourself-first.com/Supercar/Leaderboard).

This page has a serious sql-injection vulnerability that you are just dying to exploit. But first we need to find it.

:pencil2: Find the parameter that can be exploited and figure out the version of the database.

:bulb: The following queries will return the version of the database: 

```sql
Select version or @@version
```

:bulb: Finding the exploitable parameter won’t be enough to get the version, why?
