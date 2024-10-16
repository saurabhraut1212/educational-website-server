"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(400).json({ message: "Token is missing" });
    }
    const decoded = (0, auth_service_1.validateToken)(token);
    if (!decoded.isValid) {
        return res.status(401).json({ message: decoded.message });
    }
    req.body.decoded = decoded.data;
    return next();
};
exports.default = authMiddleware;
