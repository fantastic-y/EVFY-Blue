const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
});

UserSchema.plugin(passportLocalMongoose);
//also auto salt and hash password
module.exports = mongoose.model("User", UserSchema);
