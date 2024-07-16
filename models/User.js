const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String }, //身份验证  是否在线  一个小图标
  date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("user", UserSchema);

//User  通过 require 关键字引入 "User" 模型
//创建了一个名为 "user" 的 Mongoose 模型，该模型使用了之前定义的 UserSchema
