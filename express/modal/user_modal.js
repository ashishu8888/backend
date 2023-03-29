const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
var validator = require("email-validator");
//user schema...

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: function () {
      return validator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 3,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
});

//before save event occur in db...
userSchema.pre("save", function () {
  // console.log('before saving to database');
  this.confirmPassword = undefined;
});

// userSchema.pre("save", function () {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.password, salt);
//     this.password = hash;
//     console.log(hash);
// });
// after save event occur in db...
userSchema.post("save", function (doc) {
  // console.log("after saving to database",doc);
});

// model...

const userModal = mongoose.model("userModel", userSchema);
module.exports = userModal;
