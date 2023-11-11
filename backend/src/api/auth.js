const express = require("express");
const router = express.Router();
const googleAuth = require('../googleAuth');

// @desc Renders user's information from Google
// @route GET /auth/success
router.get('/auth/success', (req, res) => res.json(req.user));

// @desc Renders error message if GoogleAuth goes wrong
// @route GET /auth/error
router.get('/auth/error', (req, res) => res.send('error logging in'));

// @desc Initiates the Google OAuth authentication process
// @route GET /auth/google
router.get('/auth/google',
  googleAuth.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc Handles the callback after Google has authenticated the user
// @route GET /auth/google/callback
router.get('/auth/google/callback',
  googleAuth.authenticate('google', { failureRedirect: '/auth/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/auth/success');
  }
);

module.exports = router;