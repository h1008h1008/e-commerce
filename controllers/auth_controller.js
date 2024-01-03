const bcrypt = require("bcrypt");
const {
  createTokens,
  createresetTokens,
  validateresetToken,
} = require("../service/JWT");
const {  verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Member, Cart, CartProduct } = require("../models/modelsforapp");
const auth_controller = {
  renderRegisterPageHandler: (req, res) => {
    res.render("register");
  },
  renderLoginPageHandler: (req, res) => {
    const token = req.cookies["access-token"];
    if (validateresetToken(token)) {
      const validToken = verify(token, process.env.JWT_SECRET);
      if (validToken.username === 'admin') {
        return res.redirect('/admin');
      }
      res.render("payment", {  flag: "0" });
    } else {
      res.render("login");
    }
  },
  renderforgetPageHandler: (req, res) => {
    res.render("forget");
  },
  renderlogoutPageHandler: (req, res) => {
    res.clearCookie("access-token");
    res.render("login");
  },
  renderResetPageHandler: (req, res) => {
    if (validateresetToken(req.query.token)) {
      res.render("reset");
    } else {
      return res.status(400);
    }
  },
  LoginHandler: async (req, res) => {
    const { emailaddress, password, productDatalist } = req.body;
    const user = await Member.findOne({ where: { email: emailaddress } });

    if (!user) {
      res.json({ message: "User Doesn't Exist" });
    }
    const dbPassword = user.passhash;
    try {
      const match = await bcrypt.compare(password, dbPassword);

      if (!match) {
        res.json({ message: "Wrong Email address and Password Combination!" });
      } else {
        const existingCart = await Cart.findOne({
          where: { member_id: user.id },
        });
        if (!existingCart) {
          await Cart.create({
            member_id: user.id,
          });
        }

        if (productDatalist) {
          const filteredProducts = productDatalist.filter(
            (product) => product.shoppingtag === "1"
          );
          const resultObject = filteredProducts.reduce(
            (accumulator, product) => {
              accumulator[product.productindex] = product.quantity;
              return accumulator;
            },
            {}
          );

          memberId = user.id;
          const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
          const existtable = await CartProduct.findOne({
            where: { cart_id: Cart1.id },
          });

          if (existtable) {
            existtable.product_id_and_count = resultObject;
            await existtable.save();
          } else {
            await CartProduct.create({
              cart_id: Cart1.id,
              product_id_and_count: resultObject,
            });
          }
        }

        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });

        res.json({ message: "LOGGED IN" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  RegisterPageHandler: async (req, res) => {
    const { emailaddress, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Member.create({
        email: emailaddress,
        name: null,
        address: null,
        phone_number: null,
        account: null,
        passhash: hash,
        options: null,
      })
        .then(() => {
          res.json("USER REGISTERED");
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
  },
  forgetHandler: async (req, res) => {
    const { emailaddress } = req.body;

    const user = await Member.findOne({ where: { email: emailaddress } });

    if (!user) {
      res.json({ message: "User Doesn't Exist" });
    }
    const accessToken = createresetTokens(user);
    const { refresh_token, access_token } = req.session.tokens;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.DEBUG_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: refresh_token,
        accessToken: access_token,
      },
    });
    const mailOptions = {
      from: process.env.DEBUG_EMAIL,
      to: user.email,
      subject: "重設您的密碼",
      text:
        "點擊以下連結以重設您的密碼：\n\n" +
        process.env.HOST +
        "/authen/reset?token=" +
        accessToken +
        "\n\n如果您沒有提出重設密碼的請求，請忽略此郵件。",
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error sending email");
      } else {
        console.log(info);
        res.send("Email sent");
      }
    });
  },
  renderprofilePageHandler: async (req, res) => {
    
    res.render("payment");
  },
};

module.exports = auth_controller;
