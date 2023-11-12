const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { checkUser, createUser } = require('./api/user');

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "445543763108-fspmjduah3qqm460s8g1ppua369olarc.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'https://meditationnotmedication-production.up.railway.app/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      const result = await checkUser(profile.id);
      if (result === false){
        const response = await createUser(profile);
        done(null, response);
      }
      else{
        done(null, result);
      }
      
    }
  )
);

module.exports = passport;