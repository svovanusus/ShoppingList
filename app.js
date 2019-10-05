/*===== DEFINING CONSTATNS =====*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const session = require('express-session');
require('express-ws')(app);
 
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const passportConfig = require('./app/passportConfig');
const connection = require('./app/database');


/*===== MODELS =====*/

require('./app/models/User');
require('./app/models/Group');
require('./app/models/List');
require('./app/models/ListItem');
require('./app/models/Session');

connection.sync();


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

app.get('/groups', require('./app/routes/get/groups'));
app.get('/groups/:groupId', require('./app/routes/get/group'));

app.post('/groups/invite', require('./app/routes/post/invites'));
app.post('/groups/invites/create', require('./app/routes/post/createInvite'));
app.post('/groups/create', require('./app/routes/post/createGroup'));
app.post('/groups/leave', require('./app/routes/post/leaveGroup'));
app.post('/groups/remove', require('./app/routes/post/removeGroup'));

app.get('/lists', require('./app/routes/get/lists'));

app.post('/lists/create', require('./app/routes/post/createList'));


/*===== WEB SOCKET =====*/

require('./app/ws').init(app);

/*===== ERRORS =====*/

// Error handling 404
// eslint-disable-next-line no-unused-vars
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// Error handling 500
/*
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('500', { error: err });
});
*/

/*===== LISTEN =====*/

app.listen(3000, () => console.log("Server listening on port 3000."));