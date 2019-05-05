# Solution - Search input for reflected XSS

The search query 
```
'); alert("XSS!"); //
```
will cause the browser to show an alert-box with `XSS!` in it. 

If we take a look at the source code after injecting our malicious javascript, we can see that the `.val`-method has been closed off. This enables us to start a new javascript expression (which in our case is `alert("XSS!"`) ). In order to avoid a javascript error, we comment out the remaning part of the code, which is created by the server, by passing in `//` at the end.
