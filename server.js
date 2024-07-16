const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
//extended 设置为 false 意味着该库将使用经典编码而不是现代扩展编码
//允许你的 Express 应用程序处理请求主体中发送的 JSON 数据，
//并通过 request.body 在路由处理程序中访问这些数据。

app.get("/", (req, res) => res.send("API Running"));

//Define Routers
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
