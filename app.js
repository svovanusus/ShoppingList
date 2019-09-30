/*===== DEFINING CONSTATNS =====*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const session = require('express-session');
 
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const passportConfig = require('./app/passportConfig');
const connection = require('./app/database');


/*===== MODELS =====*/

require('./app/models/User');
require('./app/models/Group');
require('./app/models/UserGroup');
require('./app/models/List');
require('./app/models/ListItem');
require('./app/models/Session');


/*===== CONFIGURATIONS =====*/

passportConfig(passport);
app.use(session({
    secret: 'SHOPPING_LIST_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
        db: connection,
        table: 'session',
    }),
}));

app.set('view engine', 'ejs');
app.set('views', './app/views/');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public/'));


/*===== ROUTES =====*/

app.get('/', require('./app/routes/get/index'));

app.get('/sign-up', require('./app/routes/get/sign-up'));
app.post('/sign-up', require('./app/routes/post/sign-up'));

app.get('/sign-in', require('./app/routes/get/sign-in'));
app.post('/sign-in', require('./app/routes/post/sign-in'));

app.all('/sign-out', require('./app/routes/sign-out'));


// Error handling 404
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// Error handling 500
/*
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('500', { error: err });
});
*/

/*===== LISTEN =====*/

app.listen(3000, () => console.log("Server listening on port 3000."));