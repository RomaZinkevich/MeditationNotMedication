const jwt = require("jsonwebtoken");
const UserError = require("../utils/UserError");

const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        throw new UserError("AuthorizationError", "Missing token");
    }
    
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        throw new UserError("AuthorizationError", "Unauthorized token");
    }
};

const adminToken = (req, res, next) => {
    if (req.user.role === 1) {
        next();
    } else {
        throw new UserError("AuthenticationError", "No rights to access this endpoint");
    }
}

module.exports = {
    checkToken: checkToken,
    adminToken: adminToken
};