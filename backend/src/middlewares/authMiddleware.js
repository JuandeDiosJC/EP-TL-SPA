const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, autorización denegada" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
