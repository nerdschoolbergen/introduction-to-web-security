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
| Code | Routes in `src/index.js` ([Express](https://expressjs.com/en/guide/routing/)), SQL in `src/data/repository.js`, views in `src/views/` ([express-handlebars](https://github.com/express-handlebars/express-handlebars)) |
| Session cookie | `session-cookie` ([express-session](https://github.com/expressjs/session)), no [`HttpOnly`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#httponly), [`Secure`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#secure) or [`SameSite`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#samesitesamesite-value) flag, signed with the hard-coded [secret](https://github.com/expressjs/session#secret) `"SuperSecret"` |

## Handy during the workshop

- **Reset the database:** `npm run seed`. It works while the app is running. Use it after comments break the voting page or when someone has already voted.
- **Request and SQL log:** the terminal running the app logs every request, form posts show their body (`body: {"username":"user';--","password":""}`), and every SQL query is printed just before its request line (`sql: SELECT id FROM user WHERE username='user';--' AND password=''`). Ask participants to look there when a payload doesn't work; for SQL injection it shows exactly what the database received.
- **Restarting the app logs everyone out**, because sessions are kept in memory (express-session's default [`MemoryStore`](https://github.com/expressjs/session#store)).
- **`Could not load the sqlite3 native module`:** the participant's npm is set to `ignore-scripts=true`, or `node_modules` came from another OS. Fix: `npm rebuild sqlite3 --ignore-scripts=false`. Exercise 1 has a note about it.
- **Single quotes in comments show an SQL error.** The comment is inserted with string-built SQL, so `'` ends the [string literal](https://www.sqlite.org/lang_expr.html#literal_values_constants_) early and breaks the query. Tell participants to use double quotes (`alert("x")`). It's also a nice hint that the comment field is SQL-injectable.

## Exercise 1 – Up and running

Install and start the app, log in as `user` / `user`. Nothing to solve. Make sure everyone gets here before moving on.

## Exercise 2 – Reflected XSS

- **Where:** a failed login redirects to `/error?message=unable to log in user <username>`, and the error page renders `message` unescaped (`{{{message}}}` in `error.handlebars`).
- **Solution:** `http://localhost:3000/error?message=<script>alert("hello")</script>`
- **Bonus (steal the cookie):** `http://localhost:3000/error?message=<script>alert(document.cookie)</script>`. This works because the cookie isn't [`HttpOnly`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#httponly), so [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) can read it.
- **Discussion:** the attacker sends the link to a victim; the script runs in the victim's browser on the real site, with their session ([MDN: XSS](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)). Fix: escape output (`{{ }}` instead of `{{{ }}}`, see [Handlebars HTML escaping](https://handlebarsjs.com/guide/expressions.html#html-escaping)), mark the cookie `HttpOnly`, add a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

## Exercise 3 – SQL injection

- **Where:** the login query is built with string interpolation: ``SELECT id FROM user WHERE username='${username}' AND password='${password}'``.
- **3.1 – log in without a password:** username `user';--`, any or no password. The `--` starts an [SQL comment](https://www.sqlite.org/lang_comment.html), which removes the password check. The `;` ends the statement, and SQLite [only compiles the first statement](https://www.sqlite.org/c3ref/prepare.html) in a query string.
- **3.2 – log in as someone else:** usernames are in the comments (`zeratul`, `sarah_kerrigan`) and in the page source: a commented-out `<a href="/internal">User admin</a>` link in the nav, visible when logged in. `/internal` lists all users. Then log in with e.g. `zeratul';--`.
- **Discussion:** the database can't tell data from code when queries are glued together from strings. Fix: [parameterized queries](https://www.sqlite.org/lang_expr.html#parameters) (`queryOne(sql, params)` in `repository.js` already supports them).

## Exercise 4 – Persisted XSS

- **Where:** comments are stored as-is and rendered unescaped (`{{{comment}}}` in `voting.handlebars`).
- **Solution:** post the comment `<script>alert("Hacked!")</script>`. It runs every time anyone opens the voting page.
- **Gotchas:** use double quotes (see above). A broken payload can mess up the voting page; reset with `npm run seed`.
- **Discussion:** unlike reflected XSS, nobody needs to click a crafted link: everyone who views the page is hit, for as long as the comment exists ([MDN: XSS](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)).

## Exercise 5 – Parameter tampering and XSS

- **5.1 – comment as someone else:** the comment form has a [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden) `<input name="userId">`, and the server trusts it. In DevTools → Elements, change its value (e.g. `3` for `zeratul`) and submit. The comment shows up with that author.
- **5.2 – rig the election:** post the comment from the exercise's solution, `<script>document.getElementsByName("candidateId").forEach(el => el.value = 2)</script>`. It rewrites every `candidateId` field on the voting page to `2`, so whoever clicks **Vote** votes for Eleanor Wheeler. Each user can only vote once, so participants need to log in as another user (exercise 3) or run `npm run seed` to see it work.
- **Bonus (hide your tracks):** the script can remove its own comment after rewriting the votes, using [`document.currentScript`](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript) and [`closest()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest): `<script>document.getElementsByName("candidateId").forEach(el => el.value = 2); document.currentScript.closest("article").remove()</script>`. The comment no longer shows on the page, but it's still in the page source and the database.
- **Discussion:** never trust anything the client sends, including hidden fields. The server should take the user id from the session. Combined with XSS, an attacker can quietly change what other users' actions do.

## Exercise 6 – SQL injection continued

- **6.1 – extract the schema:** log in with the username `' UNION ALL SELECT GROUP_CONCAT(sql) as id FROM sqlite_schema--`. [`UNION ALL`](https://www.sqlite.org/lang_select.html#compound_select_statements) appends the injected query's rows to the login query's, [`sqlite_schema`](https://www.sqlite.org/schematab.html) holds the `CREATE` statement of every table, and [`GROUP_CONCAT`](https://www.sqlite.org/lang_aggfunc.html#group_concat) joins them into one value. The login query now returns the table definitions as the user "id", which the app stores in the session and writes into the hidden `userId` field. View the voting page source to see it.
- **6.2 – get the passwords:** same idea with `' UNION ALL SELECT GROUP_CONCAT(username || ':' || password) as id FROM user--`, where [`||`](https://www.sqlite.org/lang_expr.html#operators_and_parse_affecting_attributes) joins strings. The passwords are stored in plain text.
- **Gotcha:** the injected `SELECT` must return a single column named `id`: a [compound select](https://www.sqlite.org/lang_select.html#compound_select_statements) needs the same number of columns on both sides, and the app reads `result.id`. Hints 2–6 in the exercise walk through this.
- **Discussion:** one injectable query can leak the whole database. Plain-text passwords make it far worse; they should be hashed (bcrypt, scrypt, Argon2).

## Exercise 7 – Bonus exercises

Open-ended. Ideas for **7.1** are in the exercise (create or drop tables, replace the page, send cookies elsewhere). For **7.2 – fix the vulnerabilities**, see [Fixes](#fixes) below for the code changes.

## Exercise 8 (beta) – Broken authentication and session management

| Step | What participants should find |
|---|---|
| 8.1 Cookie flags | `session-cookie` has no [`HttpOnly`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#httponly) (`httpOnly: false` in `src/index.js`), no [`Secure`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#secure) and no [`SameSite`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#samesitesamesite-value). See [MDN: cookie security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#security). |
| 8.2 Session fixation | The session ID is the same before and after login. The app never [regenerates](https://github.com/expressjs/session#sessionregeneratecallback) it, so an attacker who planted an ID gets a logged-in session. |
| 8.3 Weak session ID | Trick question: the IDs are random ([express-session](https://github.com/expressjs/session#genid)) and not predictable. The real weakness is the hard-coded signing [secret](https://github.com/expressjs/session#secret) `"SuperSecret"` in the source code. |
| 8.4 Hijacking via XSS | A comment like `<script>console.log(document.cookie)</script>` exposes the cookie through [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie), because it isn't `HttpOnly`. |
| 8.5 Logout | Logout only deletes the cookie in the browser (`req.session = null` and `clearCookie`). The session still exists on the server (it's never [destroyed](https://github.com/expressjs/session#sessiondestroycallback)), so an old cookie still works after logging out. |

**Fixes:** [`req.session.regenerate()`](https://github.com/expressjs/session#sessionregeneratecallback) on login, [`req.session.destroy()`](https://github.com/expressjs/session#sessiondestroycallback) on logout, [`httpOnly: true`](https://github.com/expressjs/session#cookiehttponly), [`secure: true`](https://github.com/expressjs/session#cookiesecure) (with HTTPS), [`sameSite: "lax"`](https://github.com/expressjs/session#cookiesamesite) (also protects against [CSRF](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF)), a [secret](https://github.com/expressjs/session#secret) from an environment variable, and a session timeout ([`maxAge`](https://github.com/expressjs/session#cookiemaxage)). Express's [security best practices](https://expressjs.com/en/advanced/best-practice-security/#use-cookies-securely) cover the same ground. See [Fixes](#5-session-management-exercise-8) for the code.

## Fixes

The code changes that fix each vulnerability, useful for exercise 7.2 or for showing the fix after an exercise. Each diff is against the app as it is in this repository. Apply them in order with `git apply` (copy a diff into a file and run `git apply <file>` from the repo root), or read them as a guide. Passwords are still stored in plain text; hashing them would also need changes to the seed data, so it isn't shown here.

### 1. Reflected XSS (exercise 2)

Escape everything the error page shows. [Handlebars escapes](https://handlebarsjs.com/guide/expressions.html#html-escaping) `{{ }}` but not `{{{ }}}` (express-handlebars uses Handlebars for rendering). The error message and stack can also contain user input, so they're escaped too.

```diff
diff --git a/vulnerable-application/src/views/error.handlebars b/vulnerable-application/src/views/error.handlebars
index 0880c93..5c18a34 100644
--- a/vulnerable-application/src/views/error.handlebars
+++ b/vulnerable-application/src/views/error.handlebars
@@ -1,8 +1,8 @@
 <article>
   <h2>An error occured</h2>
-  <h3>{{{message}}}</h3>
-  <p>{{{error.status}}}</p>
-  <pre>{{{error.stack}}}</pre>
+  <h3>{{message}}</h3>
+  <p>{{error.status}}</p>
+  <pre>{{error.stack}}</pre>
 
   <a href="/">Go back home</a>
 </article>
```

**Blocks:** `/error?message=<script>…</script>` now shows the text instead of running it.

### 2. Persisted XSS (exercises 4 and 5.2)

Escape comments when they're rendered.

```diff
diff --git a/vulnerable-application/src/views/voting.handlebars b/vulnerable-application/src/views/voting.handlebars
index 50898f9..907a09e 100644
--- a/vulnerable-application/src/views/voting.handlebars
+++ b/vulnerable-application/src/views/voting.handlebars
@@ -37,7 +37,7 @@
     {{#each comments}}
     <article class="comment">
       <h4>Author: {{author}}</h4>
-      <p>{{{comment}}}</p>
+      <p>{{comment}}</p>
     </article>
     {{/each}}
   </div>
```

**Blocks:** script comments are shown as text, so the alert and the vote-rigging script don't run.

### 3. SQL injection (exercises 3 and 6)

Use [parameterized queries](https://www.sqlite.org/lang_expr.html#parameters) (`?` placeholders) everywhere, so input is always treated as data. `db.exec` doesn't support parameters, so the vote now runs its two updates with a new `run` helper inside the [transaction](https://www.sqlite.org/lang_transaction.html).

```diff
diff --git a/vulnerable-application/src/data/repository.js b/vulnerable-application/src/data/repository.js
index 85d2e8c..485a200 100644
--- a/vulnerable-application/src/data/repository.js
+++ b/vulnerable-application/src/data/repository.js
@@ -47,6 +47,18 @@ const queryOne = (sql, params) => {
   });
 };
 
+const run = (sql, params) => {
+  logQuery(sql, params);
+  return new Promise(function (resolve, reject) {
+    db.run(sql, params, function (error) {
+      if (error)
+        reject(error);
+      else
+        resolve();
+    });
+  });
+};
+
 const execute = (sql) => {
   logQuery(sql);
   return new Promise(function (resolve, reject) {
@@ -65,7 +77,7 @@ export const getCandidates = () => {
 
 export const getHasUserVoted = async (userId) => {
   try {
-    const user = await queryOne(`SELECT * FROM user WHERE id=${userId}`);
+    const user = await queryOne("SELECT * FROM user WHERE id = ?", [userId]);
     return user?.hasVoted === 1;
   } catch {
     return false;
@@ -73,17 +85,17 @@ export const getHasUserVoted = async (userId) => {
 }
 
 export const addComment = async ({ userId, comment }) => {
-  const user = await queryOne(`SELECT * FROM user WHERE id=${userId}`);
+  const user = await queryOne("SELECT * FROM user WHERE id = ?", [userId]);
   if (!user) {
     return
   }
 
   ``
-  await execute(`INSERT INTO comment (author, comment) VALUES ('${user?.username}', '${comment}')`);
+  await run("INSERT INTO comment (author, comment) VALUES (?, ?)", [user.username, comment]);
 }
 
 export const getUserIdByCredentials = async ({ username, password }) => {
-  const result = await queryOne(`SELECT id FROM user WHERE username='${username}' AND password='${password}'`);
+  const result = await queryOne("SELECT id FROM user WHERE username = ? AND password = ?", [username, password]);
   return result?.id;
 }
 
@@ -97,19 +109,10 @@ export const getComments = async () => {
 
 export const vote = async ({ userId, candidateId }) => {
   try {
-    await execute(`
-      BEGIN TRANSACTION;
-
-      UPDATE candidate
-      SET votes = votes + 1
-      WHERE id = ${candidateId};
-
-      UPDATE user
-      SET hasVoted = true
-      WHERE id = ${userId};
-
-      COMMIT;
-    `);
+    await execute("BEGIN TRANSACTION");
+    await run("UPDATE candidate SET votes = votes + 1 WHERE id = ?", [candidateId]);
+    await run("UPDATE user SET hasVoted = true WHERE id = ?", [userId]);
+    await execute("COMMIT");
   } catch (error) {
     // Don't leave the transaction open if one of the statements failed
     await execute("ROLLBACK").catch(() => {});
```

**Blocks:** `user';--`, `zeratul';--` and the `UNION` payloads just fail to log in. Comments containing `'` are now saved instead of causing an SQL error. The SQL log shows the difference: the input now appears as data in `params: ["user';--",""]` instead of inside the query.

### 4. Parameter tampering (exercise 5.1)

Take the comment author from the session, which the user can't change, and remove the hidden field.

```diff
diff --git a/vulnerable-application/src/index.js b/vulnerable-application/src/index.js
index e2fe757..aca30a5 100644
--- a/vulnerable-application/src/index.js
+++ b/vulnerable-application/src/index.js
@@ -91,7 +91,7 @@ app.post('/add-comment', async (req, res) => {
     res.redirect('/');
     return;
   }
-  await addComment(req.body);
+  await addComment({ userId: req.session.loggedInUser, comment: req.body.comment });
   res.redirect('/voting');
 
 })
diff --git a/vulnerable-application/src/views/voting.handlebars b/vulnerable-application/src/views/voting.handlebars
index 907a09e..1a324ac 100644
--- a/vulnerable-application/src/views/voting.handlebars
+++ b/vulnerable-application/src/views/voting.handlebars
@@ -48,7 +48,6 @@
       <fieldset>
         <label for="comment">Comment</label>
         <textarea name="comment"></textarea>
-        <input type="hidden" name="userId" value="{{loggedInUser}}" />
         <input type="submit" class="pure-button pure-button-primary" value="Submit comment" />
       </fieldset>
     </form>
```

**Blocks:** sending another `userId` with a comment has no effect; the comment is always posted as the logged-in user.

### 5. Session management (exercise 8)

Harden the session cookie, get the secret from the environment, issue a new session id at login, and destroy the session on logout. `secure` is only on in production, because [express-session doesn't set a `Secure` cookie](https://github.com/expressjs/session#cookiesecure) on a plain-HTTP connection like `http://localhost`. Login and logout pass errors to `next`, Express's [error handling](https://expressjs.com/en/guide/error-handling/). The [express-session options](https://github.com/expressjs/session#options) and Express's [cookie security advice](https://expressjs.com/en/advanced/best-practice-security/#use-cookies-securely) explain each setting.

```diff
diff --git a/vulnerable-application/src/index.js b/vulnerable-application/src/index.js
index aca30a5..54b9fc6 100644
--- a/vulnerable-application/src/index.js
+++ b/vulnerable-application/src/index.js
@@ -1,3 +1,4 @@
+import { randomBytes } from 'crypto';
 import express from 'express';
 import { engine } from 'express-handlebars';
 import session from 'express-session';
@@ -14,13 +15,16 @@ app.use(logger((tokens, req, res) => {
 }));
 
 app.use(session({
-  secret: "SuperSecret",
+  secret: process.env.SESSION_SECRET ?? randomBytes(32).toString('hex'),
   name: "session-cookie",
   cookie: {
-    httpOnly: false,
+    httpOnly: true,
+    sameSite: "lax",
+    secure: process.env.NODE_ENV === "production",
+    maxAge: 60 * 60 * 1000,
   },
-  saveUninitialized: true,
-  resave: true
+  saveUninitialized: false,
+  resave: false
 }));
 
 app.use(express.static('src/public'));
@@ -37,23 +41,36 @@ app.use((req, res, next) => {
   next()
 })
 
-app.post('/login', async (req, res) => {
+app.post('/login', async (req, res, next) => {
   const loggedInUserId = await getUserIdByCredentials(req.body);
   if (!loggedInUserId) {
     res.redirect(`/error?message=unable to log in user ${req.body.username}`);
     return
   }
 
-  req.session.loggedInUser = loggedInUserId;
-  req.session.loggedInUsername = req.body.username;
-  req.session.isLoggedIn = true;
-  res.redirect("/voting");
+  // New session id on login, so a session id planted before login is useless
+  req.session.regenerate((error) => {
+    if (error) {
+      next(error);
+      return;
+    }
+    req.session.loggedInUser = loggedInUserId;
+    req.session.loggedInUsername = req.body.username;
+    req.session.isLoggedIn = true;
+    res.redirect("/voting");
+  });
 });
 
-app.get('/logout', async (req, res) => {
-  req.session = null;
-  res.clearCookie("session-cookie");
-  res.redirect("/");
+app.get('/logout', (req, res, next) => {
+  // Remove the session on the server, not just the cookie in the browser
+  req.session.destroy((error) => {
+    if (error) {
+      next(error);
+      return;
+    }
+    res.clearCookie("session-cookie");
+    res.redirect("/");
+  });
 });
 
 app.get('/error', (req, res) => {
```

**Blocks:** JavaScript can't read the cookie (`HttpOnly`, so 8.4 and the exercise 2 bonus get nothing), the session id changes at login (8.2), an old cookie no longer works after logout (8.5), sessions expire after an hour, and the secret is no longer in the source code (8.3).
