var mongoose = require("mongoose");


var RepoSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img_name: { type: String, default: "stub.png" },
  gitLink: String
});

// return model as object
module.exports = mongoose.model("Event", RepoSchema);
