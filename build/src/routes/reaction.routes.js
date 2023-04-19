"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const comment_schema_1 = require("../schemas/comment.schema");
const router = express_1.default.Router();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
router
    .route('/messages/comment/:commentId')
    .post((0, validate_1.validate)(comment_schema_1.createCommentSchema), comment_controller_1.createCommentHandler);
exports.default = router;
