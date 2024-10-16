"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("production", "development").required(),
    PORT: joi_1.default.number().default(5000),
    MONGODB_URL: joi_1.default.string().required().description("Mongo DB url"),
    MONGOOSE_STRICT_MODE: joi_1.default.boolean().default(true),
    JWT_SECRET: joi_1.default.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION: joi_1.default.number()
        .default("8h")
        .description("minutes after which access tokens expire"),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            ssl: true,
        },
        strictQuery: envVars.MONGOOSE_STRICT_MODE,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION,
    },
};
exports.default = config;
