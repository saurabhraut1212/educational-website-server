"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const app_1 = __importDefault(require("./app"));
let server;
mongoose_1.default.set('strictQuery', config_1.default.mongoose.strictQuery);
mongoose_1.default.connect(config_1.default.mongoose.url, config_1.default.mongoose.options).then(() => {
    console.log('Connected to MongoDB');
    server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Listening to port ${config_1.default.port}`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
