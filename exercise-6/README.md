# Exercise 6 - SQL injection continued

In this exercise, we will look at some more complicated examples of SQL injection. 

## 6.1 - Extract the user table schema

:pencil2: Log out and log in using with the following username

```
' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--
```

:pencil2: Inspect the source of the voting page. Do you see anything questionable? 

:pencil2: Try extract the schema of the `candidate` and `comment` tables. 

:pencil2: Look at the source code. Try to reason on how we are able to extract table schemas using SQL injection.

:star: Bonus: Can you change the login query to execute some arbitrary SQL to steal information?

## Get a users password

The developers of this solution has not followed any good practices, and has stored the passwords as clear text! 

:pencil2: Try to use a similar technique as in the previous task to extract a users password. 


### [Go to exercise 7 :arrow_right:](../exercise-7/README.md)
