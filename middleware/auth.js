const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  //它的作用是从 HTTP 请求头中获取名为 'x-auth-token' 的令牌（token）
  //你可能会使用这个令牌来验证用户身份，确保请求是经过身份验证的
  const token = req.header("x-auth-token");

  //check if not token

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
    //.json() 方法将 JSON 响应发送给客户端
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //jwt.verify 方法来验证令牌的有效性并解码它
    //token 是要验证的令牌
    //config.get("jwtSecret") 是用于验证签名的密钥。
    // 如果令牌验证成功，jwt.verify 方法将返回解码后的令牌信息

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
