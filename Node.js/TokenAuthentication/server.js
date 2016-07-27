'use strict';

// Imports.
var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    jwt         = require('jsonwebtoken'),
    mongoose    = require('mongoose'),
    colors      = require('colors'),
    path        = require('path'),
    config      = require('./config'),
    apiRoutes   = require('./apiRoutes'),
    app         = express(),
    router      = express.Router();

// Configure cors
app.use(cors());

// Configure the body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    next();
});

// Configure the application database connection.
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to the database server!'.red);
    console.log(err.message.red);
    console.log('Aborting!'.red);
    
    process.exit();
});

mongoose.connect(config.databaseConnection);

// Configure the routes
router.get('/', function (req, res) {
    res.json({ status: 'OK' });
});

apiRoutes.public(router);

// Validate the jwt for the requests from this point
router.use(function (req, res, next) {
    
    var bearerHeader = req.headers['authorization'];
    
    if(bearerHeader) {
        
        var bearer = bearerHeader.split(" ");
        var bearerToken = bearer[1];
        
        jwt.verify(bearerToken, 'secret', function (err, decoded) {
            if(err) res.sendStatus(401);
            else {
                req.user = decoded;
                next();
            }
        });
        
    } else {
        res.sendStatus(401);
    }
});

apiRoutes.restrict(router);

app.use('/api', router);

// Configure the static files.
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 error
app.use(function (req, res, next) {
    res.status(404).sendFile('public/404.html', { root: __dirname });
});

// Start the server
app.listen(config.port);
console.log(('Magic happens at http://localhost:' + config.port).cyan);