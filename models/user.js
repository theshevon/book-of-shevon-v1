var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// defines the serialize/ deserialize methods for the user automatically
UserSchema.plugin(passportLocalMongoose);

// return model as object
module.exports = mongoose.model("User", UserSchema);
