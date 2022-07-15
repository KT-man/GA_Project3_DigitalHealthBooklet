const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

      req.decoded = decoded;
      next();
    } else {
      return res
        .status(403)
        .send({ status: "error", message: "missing Token" });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ status: "error", message: "unauthorised, please login first!" });
  }
};
module.exports = auth;