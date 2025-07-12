"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
dotenv_1.default.config();
// const app = express()
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(middlewares_1.requestLogger);
// Health check
app.get('/', (_req, res) => res.send('API is running 🚀'));
// Routes
app.use('/api/auth', routes_1.authRoutes);
app.use('/api/blog', routes_1.blogRoutes);
app.use('/api/meta', routes_1.metaRoutes);
app.use('/api/menus', routes_1.menuRoutes);
app.use('/api/pages', routes_1.pageRoutes);
app.use('/api/media', routes_1.mediaRoutes);
app.use('/api/contact', routes_1.contactRoutes);
//
app.use(middlewares_1.errorHandler);
exports.default = app;
