
# Exercise 2 - Reflected XSS

:book: You may have functionality in your website, where your users are able to input data - whether this is in a query parameter (e.g. `mysite.com?q=123`), or as a value in an input field. In a perfect world, we could trust our users - but in real life, some are far from honest.

Users may pass malicious code as input to your website, which may be executed on the server, or in the browser if the data is rendered back to the user. This exercise focuses on the latter; untrusted data being rendered back into the browser.

[Read more about XSS (owasp.org)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

---

:pencil2: When you are logged into the site, execute a search. Do you see anything suspicious? Take a look at the source code. How is your search query shown in the source code?

:pencil2: Send malicious data to the server, which causes the browser to show an alert box.

:question: The search query is persisted in the URL. Why is this a big deal? What happens if you send the link with a query to a friend ( ..or enemy)?

---

:bulb: Stuck? Take a look at the [first hint](hint_1.md).

:bulb: Still stuck? Take a look at the [second hint](hint_2.md).

:bulb: Finished or still stuck? Check out the [solution](hint_3.md) here.

---

:pencil2: :star: __Optional bonus task__

Are you able to inject malicious input which extracts the authentication cookie? Use e.g. `console.log`, show it on screen, or send it to a third party. 

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)
