# Exercise 8 BETA - Broken Authentication & Session Management

:construction: This is a (new) beta bonus excercise, only if time allows

In this exercise, you will explore how weak session handling can compromise user accounts.

## Learning goals
:book: Understand how sessions work in web applications.  
:book: Learn how session fixation and hijacking vulnerabilities arise.  
:book: Discover why secure session configuration matters.  

## 8.1 - Session Cookie Inspection

:pencil2: Log in to the application with username `user` and password `user`.

:pencil2: Open Chrome DevTools (F12) and navigate to Application → Cookies → http://localhost:3000

:question: What do you notice about the session cookie? Is it marked as `HttpOnly`? Is it marked as `Secure`?

:book: The `HttpOnly` flag prevents JavaScript from accessing cookies. The `Secure` flag ensures cookies are only sent over HTTPS.

## 8.2 - Session Fixation

:pencil2: Before logging in, note your session cookie value.

:pencil2: Log in and check if the session ID changed.

:question: What security risk exists if the session ID doesn't change after login?

:bulb: Session fixation allows an attacker to set a victim's session ID before they log in, then hijack the authenticated session.

## 8.3 - Weak Session ID

:pencil2: Look at the session management code in the application.

:pencil2: Log in and out multiple times, noting the session IDs.

:question: Can you identify a pattern in how session IDs are generated? Are they predictable?

:star: Bonus: Try to predict another user's session ID based on timing or patterns.

## 8.4 - Session Hijacking via XSS

:pencil2: Combine your XSS knowledge from previous exercises to steal a session cookie.

:pencil2: Craft a payload that sends the session cookie to an external server (you can use `console.log` for demonstration).

Example payload structure:
```javascript
<script>
// Your code here to extract and exfiltrate document.cookie
</script>
```

## 8.5 - Missing Logout Functionality

:pencil2: Examine what happens when you click "Log out".

:pencil2: Check if the session is properly destroyed on the server side.

:question: Can you reuse an old session cookie after logging out?

## Mitigation

:book: Secure session management should include:
- Generate cryptographically random session IDs
- Regenerate session ID on login
- Set `HttpOnly` and `Secure` flags on cookies
- Implement proper session timeout
- Destroy sessions on logout (both client and server)
- Use `SameSite` cookie attribute to prevent CSRF
