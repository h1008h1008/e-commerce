const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.email, id: user.id },
    process.env.JWT_SECRET
  );
  return accessToken;
};
const createresetTokens = (user) => {
  const onehr = "60m";
  const accessToken = sign(
    { username: user.email, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: onehr }
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken);
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const validateadminToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User not Authenticated!" });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      if (validToken.username === 'admin') {
        req.authenticated = true;
        return next();
      } else {
        return res.status(401).json({ error: "Not authorized. Admins only." });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const validateresetToken = (accessToken) => {
  if (!accessToken) return false;
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

module.exports = {
  createTokens,
  createresetTokens,
  validateToken,
  validateresetToken,
  validateadminToken
};
