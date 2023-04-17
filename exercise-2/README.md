
# Exercise 2 - Reflected XSS

:book: You may have functionality in your website, where your users are able to input data - whether this is in a query parameter (e.g. `mysite.com?q=123`), or as a value in an input field. In a perfect world, we could trust our users - but in real life, some are far from honest.

Users may pass malicious code as input to your website, which may be executed on the server, or in the browser if the data is rendered back to the user. This exercise focuses on the latter; untrusted data being rendered back into the browser.

[Read more about XSS (owasp.org)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

---

:pencil2: When trying to log in, try to see if you can produce an error. Do you see anything unusual about how the error message is presented?

:question: What are the consequences of having a reflected XSS vulnerability in our app? What happens if you send a where you have crafted a "special" query to a friend ( ..or enemy)?

---

<details>
    <summary>Hint 1</summary>
    Look at the URL query parameter. What happens if you try changing the query parameter?
</details>

<details>
    <summary>Hint 2</summary>
    Try to pass something that is evaluated by the browser as the query parameter.
</details>

---

:pencil2: :star: __Optional bonus task__

Are you able to inject malicious input which extracts the authentication cookie? Use e.g. `console.log`, show it on screen, or send it to a third party. 

:question: What are the consequences of stealing an authentication cookie?

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)
