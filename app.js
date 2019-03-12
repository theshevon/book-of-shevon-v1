/*=========================package/schema imports=============================*/

var methodOverride = require("method-override"),
    localStrategy  = require("passport-local"),
    flash          = require("connect-flash"),
    bodyParser     = require("body-parser"),
    passport       = require("passport"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    helmet         = require("helmet"),
    app            = express();

var User  = require("./models/user");

var adminRoutes  = require("./routes/admin"),
    indexRoutes  = require("./routes/index"),
    repoRoutes   = require("./routes/repos"); 

/*==================================app config================================*/

// connect to database
// mongoose.connect("mongodb://yoloswag69:is this the real lyf 69@ds261917.mlab.com:61917/portfolio",
mongoose.connect("mongodb://127.0.0.1:27017/portfolio", 
                 {useNewUrlParser: true}, 
                 function(err, db) {
                    if (err) {
                        console.log('Unable to connect to the database.\n', err);
                    } else {
                        console.log('Successfully connected to database.');
                    }
                });

app.use(flash());   // needs to be BEFORE passport config
app.use(helmet());

app.use(require("express-session")({
    secret: "I am Beyonce, always",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// move user data and flash errors to all views
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/*===================================routing==================================*/

app.use(adminRoutes);
app.use(repoRoutes);
app.use(indexRoutes);

// local deployment
app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
