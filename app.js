const express = require("express");
const exphbs = require("express-handlebars");
require('dotenv');
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const publicPath = path.join(__dirname, "./views");
const product_router = require("./routes/product_router");
const authen_router = require("./routes/authen_router");
const api_router = require("./routes/api_router");
const pay_router = require("./routes/pay_router");
const auth_router = require("./routes/auth_router");
const app = express();
const port = 3000;
var session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      eq: function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
      },
    },
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use("/auth", auth_router);
app.use("/api", api_router);
app.use("/authen", authen_router);
app.use("/", pay_router);
app.use("/",product_router);
app.use("/", express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOST}`);
});
