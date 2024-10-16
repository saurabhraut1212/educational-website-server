"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const authMiddleware = () => (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Token missing");
        }
        const decoded = (0, auth_service_1.validateToken)(token);
        if (!decoded.isValid) {
            throw new Error(decoded.message);
        }
        req.body.decoded = decoded.data;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = authMiddleware;
