"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashedOtp = exports.decrypt = exports.encrypt = exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config/config"));
// Generate a JWT token
const generateToken = (data) => {
    var _a;
    const secret = config_1.default.jwt.secret || 'default_secret'; // Replace with your own JWT secret
    const expiresIn = (_a = config_1.default.jwt.accessExpirationMinutes) !== null && _a !== void 0 ? _a : '8h'; // Token expiration time (8 hours)
    const payload = data; // Token payload
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
// Validate a JWT token
const validateToken = (token) => {
    try {
        const secret = config_1.default.jwt.secret || 'default_secret'; // Replace with your own JWT secret
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { isValid: true, data: decoded };
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return { isValid: false, message: 'TokenExpiredError' };
        }
        return { isValid: false, message: 'Invalid token' };
    }
};
exports.validateToken = validateToken;
// Encrypt using bcrypt
const encrypt = (plaintext) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcryptjs_1.default.hash(plaintext, saltRounds);
});
exports.encrypt = encrypt;
// Compare plaintext with hashed in the database
const decrypt = (plaintext, hashedText) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(plaintext, hashedText);
});
exports.decrypt = decrypt;
const getHashedOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Encrypt OTP using bcrypt
    const hashedOtp = yield (0, exports.encrypt)(otp);
    return { otp, hashedOtp };
});
exports.getHashedOtp = getHashedOtp;
