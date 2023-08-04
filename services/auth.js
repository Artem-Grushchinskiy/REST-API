const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { userModel } = require("../models/user");

const sendUnauthorizedResponse = (res, message) => {
  res.status(401).json({ message: message || "Not authorized" });
};

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return sendUnauthorizedResponse(res);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return sendUnauthorizedResponse(res);
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { id } = decodedToken;
    const user = await userModel.findById(id);
    if (!user || !user.token || user.token !== token) {
      return sendUnauthorizedResponse(res);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return sendUnauthorizedResponse(res);
    }
    if (error.name === "JsonWebTokenError") {
      return sendUnauthorizedResponse(res);
    }
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
