const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  getAccessToken,
  checkSession,
  generateRedirectURI,
  getUserInfo,
} = require('./middleware/authenticationMiddleware');
const {
  saveUserInfo,
  getUserProjects,
} = require('./middleware/databaseMiddleware');
const port = 3000;

// global variables

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../build')));

// end points

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/login', generateRedirectURI, (req, res) => {
  res.redirect(res.body.githubURI);
});

app.get('/authorize', getAccessToken, getUserInfo, saveUserInfo, (req, res) => {
  res.redirect();
});

app.get('/isAuthenticated', checkSession, getUserProjects, (req, res) => {
  res.json();
});

app.get('/userInfo', checkSession, getUserProjects, (req, res) => {
  next();
});

app.post('/userInfo', (req, res) => {
  next();
});

app.listen(port);
