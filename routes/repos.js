var Repo    = require("../models/repo"),
    express = require("express"),
    multer  = require("multer"),
    path    = require("path");

var router = express.Router();

// global var to store filename
var filename = "";
const file_path = './public/repo_covers'

/*================================multer config===============================*/

// set storage engine
const storage = multer.diskStorage({
    destination: file_path,
    filename: function(req, file, cb){
        filename = file.originalname;
        cb(null, file.originalname);
    }
});

// init upload
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('repo_img');

// file checker
function checkFileType(file, cb){
    // allowed ext
    const filetypes = /jpeg|jpg|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname){
        return cb(null, true);
    } else{
        cb("Error: Images only");
    }
}

/*====================================routing==================================*/

// show all repos
router.get("/repos", function(req, res){
    
    // retrieve all repos from db
    Repo.find({}, function(err, repos){
        if (err){
            req.flash("error", "Oops, something went wrong!");
            // redirect to home page
            res.redirect("/");
        }

        res.render("repos", { repos : repos });
    });
});

// repo creation page
router.get("/repos/new", isLoggedIn, function(req, res){
    res.render("add-repo");
});

// edit a repo block
router.get("/repos/:id/edit", isLoggedIn, function(req, res){
    
    Repo.findById(req.params.id, function(err, repo){
        if (err || !repo){
            req.flash("error", "The repo does not exist!")
            res.redirect("/repos");
        } else{
            res.render("edit-repo", { repo : repo });
        }
    });
});

// create a repo block
router.post("/repos", isLoggedIn, upload, function(req, res){

    // link repo to cover image
    if (filename !== ""){   // new upload occurred
        req.body.repo.img_name = filename;

        // reset filename
        filename = "";
    }

    Repo.create(req.body.repo, function(err, repo){
      if (err){
        req.flash("error", "Sorry, your request couldn't be completed at this \
                                                                        time.")
        res.redirect("/repos");
      }

      req.flash("success", "Repo Block Successfully Added");
      res.redirect("/repos");
    });
});

// update a repo
router.put("/repos/:id", isLoggedIn, function(req, res){

    // update cover linkage if necessary
    if (filename !== ""){
        req.body.repo.img_name = filename;

         // reset filename
         filename = "";

        //  DELETE LAST IMAGE IF IT WASNT STUB
    }

    // find repo by its ID and update it
    Repo.findByIdAndUpdate(req.params.id, req.body.repo, function(err, repo){
        if (err){
            req.flash("error", "Error: Sorry, your request could not be \
                                                    completed at this time");
            res.redirect("/repos");
        } else{
            req.flash("success", "Repo Successfully Updated");
            res.redirect("/repos");
        }
    });
});

// delete a specific repo
router.delete("/repos/:id", isLoggedIn, function(req, res){

    // DELETE IMAGES IF THEY WERENT STUB

    // find repo by its ID and delete it
    Repo.findByIdAndDelete(req.params.id, function(err){
        if (err){
            req.flash("error", "Error: Sorry, your request could not be \
                                                    completed at this time");
            res.redirect("back");
        } else{
            req.flash("success", "Repo Successfully Deleted")
            res.redirect("/repos");
        }
    });
});

/*================================helper functions============================*/

/**
 * Middleware to check if a user has logged in.
 */
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/admin");
}
  
module.exports = router;


