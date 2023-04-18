# Exercise 5 - Parameter tampering and XSS

Parameter tampering is a type of web vulnerability where an attacker modifies input parameters in a URL or form submission to gain unauthorized access or perform malicious actions on a web application. 

By altering parameters such as account numbers, transaction amounts, or user IDs, an attacker can manipulate the application to perform actions that were not intended by the application's designers, such as accessing other users' data or bypassing authentication checks.

Parameter tampering attacks can be prevented by implementing strong input validation and using secure encryption and authentication measures.

## 5.1 - Tampering with the comment field

:pencil2: Open your browsers inspector and look at the comment form. Tamper with parameters, and try to submit a comment on behalf of someone else.

## 5.2 - How to rig an election

:pencil2: Try to exploit the comment field by submitting a persistent XSS attack that forces the all users to vote for the candidate Eleanor Wheeler. 

:bonus: Can you hide your tracks using your XSS attack, by having the script remove itself after executing the malicious vote?

### [Go to exercise 6 :arrow_right:](../exercise-6/README.md)