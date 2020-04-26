const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const steamRouter = require('./routes/steam.router.js');
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy;
const session = require('express-session')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

app.use(session({
    secret: 'superSECRET',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes/steam.router');
app.use('/auth/', router);

/** ---------- STEAM ---------- **/

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/steam/return',
    realm: 'http://localhost:5000/',
    apiKey: '6063BABCF57998199D643BB845BDE325'
},
    function (identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            console.log('profile:', profile);
            session.user = profile
            
            return done(null, profile);
        });
    }
));

app.get('/', function (req, res) {
    console.log('GET /');
    console.log('user', req.session.user);
    
    res.send(req.session.user);
});

app.get('/account', ensureAuthenticated, function (req, res) {
    res.send(req.user);
});

app.get('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.sendStatus(200);
}

/** ---------- ROUTES ---------- **/
app.use('/steam', steamRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});