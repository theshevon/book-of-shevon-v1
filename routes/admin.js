var User     = require("../models/user"),
    passport = require("passport"),
    express  = require("express");

var router = express.Router();

// USER LOGIN PAGE 
router.get("/zARnzmf7aENNHGuTBUPT", function(req, res){
  res.render("admin");
});

// LOGIN USER
router.post("/zARnzmf7aENNHGuTBUPT", passport.authenticate("local", {
    failureRedirect: "/zARnzmf7aENNHGuTBUPT",
    failureFlash: "Invalid username or password"
}), function(req, res){

    //  verify user
    User.findById(req.user._id, function(err, user){
        if (err || !user){
            // redirect to login page
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/zARnzmf7aENNHGuTBUPT");
        }
    });

    // login user and redirect to home page
    req.flash("success", "Successfully Logged In");
    res.redirect("/home");
});


// USER LOGOUT
router.get("/zARnzmf7aENNHGuTBUPTout", isLoggedIn, function(req, res){
    
    // logout user and redirect to home page
    req.logout();
    req.flash("success", "Succesfully Logged Out!");
    res.redirect("/home");
});

// NEW USER REGISTRATION PAGE
router.get("/zARnzmf7aENNHGuTBUPTreg", function(req, res){
    res.render("register");
});

// REGISTER NEW USER
router.post("/zARnzmf7aENNHGuTBUPTreg", function(req, res){

    // verify username 
    User.register(new User({username: req.body.username}), req.body.password, 
                                                            function(err, user){

        if (err){
            console.log(err);
            req.flash("error", "Username already in use!");
            res.redirect('/zARnzmf7aENNHGuTBUPTreg');
        }

        // logs user in and runs 'serialize' method
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Logged In!");
            res.redirect("/home");
        });
    })
});

/**
 * Middleware to check if a user has logged in.
 */
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/zARnzmf7aENNHGuTBUPT");
}

module.exports = router;