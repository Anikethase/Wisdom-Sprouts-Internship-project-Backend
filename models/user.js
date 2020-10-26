var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    mobile_no :{
      type : Number,
      trim: true,
      unique : true,
      required : true
    },
    address: {
      type: String,
      trim: true
    },
    DOB: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


userSchema.methods = 
{
  authenticate: function(plainpassword) {
    return plainpassword === this.password;
  },
};

module.exports = mongoose.model("User", userSchema);
