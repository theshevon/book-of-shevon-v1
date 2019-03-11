var mongoose = require("mongoose");


var RepoSchema = new mongoose.Schema({
  name: String,
  desc: String,
  gitLink: String
});

// return model as object
module.exports = mongoose.model("Event", RepoSchema);
