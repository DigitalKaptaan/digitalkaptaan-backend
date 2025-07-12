"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const router = express_1.default.Router();
router.post('/register', (0, middlewares_1.validate)(validators_1.registerSchema), controllers_1.register);
router.post('/login', controllers_1.login);
exports.default = router;
