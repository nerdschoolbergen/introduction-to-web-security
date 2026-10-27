# Organizer cheatsheet

A quick reference for workshop organizers: what each exercise is about, the answers, and what tends to trip participants up. Participants can find the hints and some solutions in the exercises themselves; this sheet has all of them in one place.

## Before the workshop

- Participants need the latest Node.js LTS, Chrome and a code editor, or a GitHub account to use [Codespaces](codespaces.md).
- Setup is `npm install` and `npm run dev` in `vulnerable-application`. The app runs on <http://localhost:3000>.
- Each participant runs their own copy of the app with their own database, so attacks only affect their own machine.

## The app at a glance

| Thing | Details |
|---|---|
| Users (username / password) | `jim_raynor` / `terran_rox` (id 1), `sarah_kerrigan` / `zergs_r0ckz!` (id 2), `zeratul` / `hunter3` (id 3), `user` / `user` (id 4) |
| Candidates | 1 Isabel Evans, 2 Eleanor Wheeler, 3 Charlie McCarthy, 4 Michael Gardner |
| Pages | `/` login, `/voting` vote and comments, `/error?message=…` error page, `/internal` user list (hidden link), `/logout` |
| Code | Routes in `src/index.js`, SQL in `src/data/repository.js`, views in `src/views/` |
| Session cookie | `session-cookie`, no `HttpOnly`, `Secure` or `SameSite` flag, signed with the hard-coded secret `"SuperSecret"` |

## Handy during the workshop

- **Reset the database:** `npm run seed`. It works while the app is running. Use it after comments break the voting page or when someone has already voted.
- **Request log:** the terminal running the app logs every request, and form posts show their body (`body: {"username":"user';--","password":""}`). Ask participants to look there when a payload doesn't work.
- **Restarting the app logs everyone out**, because sessions are kept in memory.
- **`Could not load the sqlite3 native module`:** the participant's npm is set to `ignore-scripts=true`, or `node_modules` came from another OS. Fix: `npm rebuild sqlite3 --ignore-scripts=false`. Exercise 1 has a note about it.
- **Single quotes in comments show an SQL error.** The comment is inserted with string-built SQL, so `'` breaks the query. Tell participants to use double quotes (`alert("x")`). It's also a nice hint that the comment field is SQL-injectable.

## Exercise 1 – Up and running

Install and start the app, log in as `user` / `user`. Nothing to solve. Make sure everyone gets here before moving on.

## Exercise 2 – Reflected XSS

- **Where:** a failed login redirects to `/error?message=unable to log in user <username>`, and the error page renders `message` unescaped (`{{{message}}}` in `error.handlebars`).
- **Solution:** `http://localhost:3000/error?message=<script>alert("hello")</script>`
- **Bonus (steal the cookie):** `http://localhost:3000/error?message=<script>alert(document.cookie)</script>`. This works because the cookie isn't `HttpOnly`.
- **Discussion:** the attacker sends the link to a victim; the script runs in the victim's browser on the real site, with their session. Fix: escape output (`{{ }}` instead of `{{{ }}}`), mark the cookie `HttpOnly`, add a Content Security Policy.

## Exercise 3 – SQL injection

- **Where:** the login query is built with string interpolation: ``SELECT id FROM user WHERE username='${username}' AND password='${password}'``.
- **3.1 – log in without a password:** username `user';--`, any or no password. The `--` comments out the password check.
- **3.2 – log in as someone else:** usernames are in the comments (`zeratul`, `sarah_kerrigan`) and in the page source: a commented-out `<a href="/internal">User admin</a>` link in the nav, visible when logged in. `/internal` lists all users. Then log in with e.g. `zeratul';--`.
- **Discussion:** the database can't tell data from code when queries are glued together from strings. Fix: parameterized queries (`queryOne(sql, params)` in `repository.js` already supports them).

## Exercise 4 – Persisted XSS

- **Where:** comments are stored as-is and rendered unescaped (`{{{comment}}}` in `voting.handlebars`).
- **Solution:** post the comment `<script>alert("Hacked!")</script>`. It runs every time anyone opens the voting page.
- **Gotchas:** use double quotes (see above). A broken payload can mess up the voting page; reset with `npm run seed`.
- **Discussion:** unlike reflected XSS, nobody needs to click a crafted link: everyone who views the page is hit, for as long as the comment exists.

## Exercise 5 – Parameter tampering and XSS

- **5.1 – comment as someone else:** the comment form has a hidden `<input name="userId">`, and the server trusts it. In DevTools → Elements, change its value (e.g. `3` for `zeratul`) and submit. The comment shows up with that author.
- **5.2 – rig the election:** post the comment from the exercise's solution. It rewrites every `candidateId` field on the voting page to `2`, so whoever clicks **Vote** votes for Eleanor Wheeler. Each user can only vote once, so participants need to log in as another user (exercise 3) or run `npm run seed` to see it work.
- **Bonus (hide your tracks):** one approach is to let the script remove its own comment after rewriting the votes, e.g. save `document.currentScript` at the top and call `.closest("article").remove()` on it.
- **Discussion:** never trust anything the client sends, including hidden fields. The server should take the user id from the session. Combined with XSS, an attacker can quietly change what other users' actions do.

## Exercise 6 – SQL injection continued

- **6.1 – extract the schema:** log in with the username `' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--`. The login query now returns the table definitions as the user "id", which the app stores in the session and writes into the hidden `userId` field. View the voting page source to see it.
- **6.2 – get the passwords:** same idea with `' UNION ALL SELECT GROUP_CONCAT(username || ':' || password) as id FROM user--`. The passwords are stored in plain text.
- **Gotcha:** the injected `SELECT` must return a single column named `id`, because the app reads `result.id`. Hints 2–6 in the exercise walk through this.
- **Discussion:** one injectable query can leak the whole database. Plain-text passwords make it far worse; they should be hashed (bcrypt, scrypt, Argon2).

## Exercise 7 – Bonus exercises

Open-ended. Ideas for **7.1** are in the exercise (create or drop tables, replace the page, send cookies elsewhere). For **7.2 – fix the vulnerabilities**, the main fixes are:

- Parameterized queries everywhere in `repository.js`.
- Escaped output: `{{ }}` instead of `{{{ }}}` in `error.handlebars` and `voting.handlebars`.
- Take the comment author from `req.session.loggedInUser`, not the form.
- Session hardening from exercise 8.

## Exercise 8 (beta) – Broken authentication and session management

| Step | What participants should find |
|---|---|
| 8.1 Cookie flags | `session-cookie` has no `HttpOnly` (`httpOnly: false` in `src/index.js`), no `Secure` and no `SameSite`. |
| 8.2 Session fixation | The session ID is the same before and after login. The app never regenerates it, so an attacker who planted an ID gets a logged-in session. |
| 8.3 Weak session ID | Trick question: the IDs are random (express-session) and not predictable. The real weakness is the hard-coded signing secret `"SuperSecret"` in the source code. |
| 8.4 Hijacking via XSS | A comment like `<script>console.log(document.cookie)</script>` exposes the cookie, because it isn't `HttpOnly`. |
| 8.5 Logout | Logout only deletes the cookie in the browser (`req.session = null` and `clearCookie`). The session still exists on the server, so an old cookie still works after logging out. |

**Fixes:** `req.session.regenerate()` on login, `req.session.destroy()` on logout, `httpOnly: true`, `secure: true` (with HTTPS), `sameSite: "lax"`, a secret from an environment variable, and a session timeout (`maxAge`).
