const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Role = require("../models/role.model");


const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      alias:"firstName"
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      alias:"lastName"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    role_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    },
    phone_number: {
      type: Number,
      required: true,
      trim: true,
      alias:"phoneNumber"
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
  
  },
 
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeid] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeid) {
  const user = await this.findOne({ email, _id: { $ne: excludeid } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

async function addUserCollection(){
  const UserRow = new User({"firstName":"Administrator","lastName":"User","email":"admin@yopmail.com","phoneNumber":9999999999,"password":"password1" , role_id:"623db5eec0a8bb23704ae924"})
  UserRow.save()
}
// addUserCollection()
// addPermissionRoleRealationCollection()
module.exports = User;
