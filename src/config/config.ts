import dotenv from "dotenv";
import Joi from "joi";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    MONGOOSE_STRICT_MODE: Joi.boolean().default(true),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION: Joi.number()
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
    },
    strictQuery: envVars.MONGOOSE_STRICT_MODE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION,
   
  },
};

export default config;
