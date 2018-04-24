
# Exercise 3 - Stored XSS

Browse to http://localhost:8080/WebGoat/start.mvc#attack/611366032/900/1 (login using guest/guest if you havent already). You should now be on Cross-Site Scripting (XSS) stage 1.

The goal of the exercise is to login as Tom (pw:tom) and store a XSS-payload in the street-field of his profile. Then log in as Jerry (Pw:jerry) and verify that the exploit affects jerry. 

Hints:
- Javascript ````<script>Code goes here</script>````
- Alert is ````alert()````



