
# Exercise 5 - Tampering and more SQL injection
Now that you know which database that is running in the background, we can head over to the voting page. Example http://hack-yourself-first.com/Supercar/1 the voting here has multiple vulnerabilities and should be exploited.

## Prerequisites 
You will need a proxy to intercept the request from the browser. Proxies you can use include:
- Fiddler
- Charles
- Burp suite proxy.

:pencil2: Set up a proxy and intercept traffic between you and the Hack-yourself-first site.

:book: Check out [for setting up using Burp Suite and Firefox](guide_setup_burp.md), however you are welcome to use any other software.

---

:pencil2: Turn on your proxy, and use your initial vote. Then use your proxy of choice to replay the request to vote multiple times. 

:pencil2: Use the exploitable parameter to extract the password for user with an `ID` of __`1`__ from the database.

:bulb: You will need to do multiple queries, think of queries that expose database structures such as 
```sql
select * from sys.tables
```

### [Go to exercise 6 :arrow_right:](../exercise-6/README.md)