var express     = require("express"),
    feedReader  = require("feed-reader");

var router = express.Router();

router.get("/art", function(req, res){
    res.render("art");
});

router.get("/about", function(req, res){
    res.render("about");
});

router.get("/blog", function(req, res){

    var date = new Date();

    // rss url of blog
    var feedURL = "https://medium.com/feed/@shevon_mendis";
    
    feedReader.parse(feedURL).then((feed) => {
        res.render("blog", {posts: feed.entries, date: date});
    }).catch((err) => {
        console.log(err);
        res.redirect("/home");
    });

});

router.get("/music", function(req, res){
    res.render("music");
});

router.get("/photography", function(req, res){
    res.render("photography");
});

router.get("/*", function(req, res){
    res.render("home");
});

module.exports = router;