const { Router } = require('express')
var auth_router = Router();

const googleOAuth2Client = require('../service/googleOAuth2Client');

const SCOPES = [
  'https://mail.google.com/',
];

auth_router.get('/login', (req, res) => {
  const authUrl = googleOAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

auth_router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  console.log(123)
  try {
    const { tokens } = await googleOAuth2Client.getToken(code)

    googleOAuth2Client.setCredentials(tokens);
    req.session.tokens = tokens;

    res.redirect('/');
  } catch (err) {
    console.error('Error authenticating with Google:', err);
    res.status(500).send('Error authenticating with Google');
  }
});

module.exports = auth_router;
