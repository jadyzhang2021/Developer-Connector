const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
//引入 express-validator 模块的一种方式。该模块用于在 Express.js 应用程序中进行验证
// { check, validationResult } 这是使用解构赋值语法
//check 这是一个函数，用于在验证过程中定义验证规则。
//和 validationResult 是一个函数，用于检查验证过程中是否存在错误可以调用 validationResult 函数来获取包含验证结果的对象

//@router post api/users
//@desc Test route
//@access public
router.post(
  "/",
  [
    check("name", "Name is requires").not().isEmpty().isLength({ min: 5 }),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charchters"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    //可以直接使用 name、email 和 password 这些变量，
    //而不需要每次都使用 req.body.name、req.body.email 和 req.body.password。
    try {
      // see if user exists
      let user = await User.findOne({ email });
      // MongoDB 中的集合（Collection）= User  ,也就是在已存在的集合中找相同的email

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email register already" }] });
      }

      // get users gravatar头像
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      //email)，用于标识用户
      //s: "200"：表示头像的大小为 200x200 像素。
      //r: "pg"：表示头像的评级，使用 "pg" 表示适合所有年龄的内容。
      //d: "mm"：表示默认头像，使用 "mm" 表示使用默认的 "mystery man" 头像
      user = new User({ name, email, avatar, password });

      //encrypt password
      const salt = await bcrypt.genSalt(10); //加密密码的库，它使用哈希函数并添加 salt 来增加密码的安全性。

      user.password = await bcrypt.hash(password, salt);
      //用 bcrypt 的 hash 函数，将原始密码和 salt

      await user.save();

      //user.save(): 这是 Mongoose 模型的方法，用于将用户文档保存到 MongoDB 数据库。
      // return jsonwebtoken
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
    //errors：这是由validationResult函数返回的对象
    //isEmpty()：这个方法检查是否存在任何验证错误。当error 有严重错误时就会给isempty返回一个false 就回继续执行，相反则不执行
  }
);

module.exports = router;
