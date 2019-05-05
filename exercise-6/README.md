
# Exercise 6 - Cross site request forgery

Cross site request forgery (CSRF) is an attack that foces a user to execute unwanted actions in a web application for which they are authenticated. This is done through tricking the victim into submitting a malicious request to the server from another site. 

[Read more about CSRF (owasp.org)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))

---

The site has a page where you can change your password, https://hack-yourself-first.com/Account/ChangePassword study the form and see where the request goes.

:pencil2: Create a new html page localy, which exploits the currently logged in user’s authentication cookie to change the password on https://hack-yourself-first.com. 