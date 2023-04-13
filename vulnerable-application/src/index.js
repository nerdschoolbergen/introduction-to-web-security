import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { getCandidates, getUserIdByCredentials, getUsers, vote } from './data/repository.js';
import bodyParser from 'body-parser';

const app = express();

app.use(session({
  secret: "SuperSecret",
  name: "session-cookie",
  cookie: {
    httpOnly: false,
  }
}));

app.use(express.static('src/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next()
})

app.post('/login', async (req, res) => {
  const loggedInUserId = await getUserIdByCredentials(req.body);
  if (!loggedInUserId) {
    res.redirect(`/error?msg=unable to log in user ${req.body.username}`);
    return
  }

  req.session.loggedInUser = loggedInUserId;
  req.session.isLoggedIn = true;
  res.redirect("/voting");
});

app.get('/logout', async (req, res) => {
  req.session = null;
  res.clearCookie("session-cookie");
  res.redirect("/");
});

app.get('/error', (req, res) => {
  res.render('error', { msg: req.query.msg });
});

app.get('/internal', async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/');
    return;
  }

  const users = await getUsers();
  res.render('internal', { users });
});

app.get('/voting', async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/');
    return;
  }

  const candidates = await getCandidates();
  res.render('voting', { candidates });
});

app.post('/vote', async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/error");
    return;
  }

  const userId = req.session.loggedInUser;
  const candidateId = req.body.candidateId;

  await vote({ userId, candidateId });
  res.redirect("/voting");
})

app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/voting");
  }

  res.render('home');
});

app.listen(3000);
console.log('App started on port 3000');