# Exercise 7 - SQL injection continued

## Extract the user table schema
:pencil2: Log out and log in using with the following username

```
' UNION ALL SELECT sql as id FROM sqlite_schema WHERE name='user'--
```

:pencil2: Inspect the source of the voting page. Do you see anything questionable? 

:pencil2: Try extract the schema of the `candidate` and `comment` tables. 

:pencil2: Look at the source code. Try to reason on how we are able to extract table schemas using SQL injection.

:star: Bonus: Can you change the login query to execute some arbitrary SQL to steal information?

## Get all users passwords



### [Go to exercise 8 :arrow_right:](../exercise-8/README.md)
