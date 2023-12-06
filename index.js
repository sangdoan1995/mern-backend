require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const webRouter = require("./routes/router");
const SendAuto = require("./controller/TodoController")
require('dotenv').config()
// database connection
connection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// routes
webRouter(app);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;
//setInterval
setInterval(() => {
    SendAuto.SetInterval();
    console.log(`SetInterval run Port ${port} ...`)
}, 30000)

app.listen(port, console.log(`Listening on port ${port}...`));
// const port = 443;
// server.listen(port, () => {
//     console.log(`server run port${port}....`)
// })
