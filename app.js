/*=========================package/schema imports=============================*/

var express               = require("express"),
    app                   = express();

/*==================================app config================================*/

// connect to umisc database
// mongoose.connect("mongodb://127.0.0.1:27017/my_site", 
//                  {useNewUrlParser: true}, 
//                  function(err, db) {
//                     if (err) {
//                         console.log('Unable to connect to the database.\n', err);
//                     } else {
//                         console.log('Successfully connected to database.');
//                     }
//                 });


// move user data and flash errors to all views
// app.use(function(req, res, next){
//   res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride("_method"));

/*====================================routing==================================*/

app.get("/", function(req, res){
    res.render("home");
});

// local deployment
app.listen(4000, function(){
    console.log("Successfully connected to server.");
});

// production
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Successfully connected to server.");
// });
