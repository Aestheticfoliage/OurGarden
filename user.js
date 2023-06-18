// app.js

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Configure Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Here, you can handle the user creation logic
  // Save the user profile and other relevant information to the database

  // For this example, we'll simply pass the user profile to the callback
  done(null, profile);
}));

// Serialize user profile
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user profile
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Google OAuth 2.0 authentication route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// Google OAuth 2.0 callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or respond with success message
    res.redirect('/profile');
  }
);

// Profile page route
app.get('/profile', (req, res) => {
  res.send('Welcome to your profile!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
