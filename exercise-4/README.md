
# Exercise 4 - SQL Injection
Go to the leaderboard page at
[http://hack-yourself-first.com/Supercar/Leaderboard](http://hack-yourself-first.com/Supercar/Leaderboard).

This page has a serious sql-injection vulnerability that you are just dying to exploit. But first we need to find it.

:pencil2: Find the parameter that can be exploited and figure out the version of the database.

:bulb: The following queries will return the version of the database: 

```sql
Select version or @@version
```

:bulb: Finding the exploitable parameter won’t be enough to get the version, why?
