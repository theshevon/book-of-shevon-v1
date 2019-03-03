/*=========================package/schema imports=============================*/

var express               = require("express"),
    feedReader            = require("feed-reader"),
    countFiles            = require("count-files"),
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


app.get("/blog", function(req, res){

    // rss url of blog
    var feedURL = "https://medium.com/feed/@shevon_mendis";
    
    feedReader.parse(feedURL).then((feed) => {
        res.render("blog", {posts: feed.entries});
    }).catch((err) => {
        console.log(err);
        res.redirect("/home");
    });

});

app.get("/art", function(req, res){
    res.render("art");
});

app.get("/*", function(req, res){
    res.render("home");
});

// local deployment
app.listen(3000, function(){
    console.log("Successfully connected to server.");
});
