"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const message_schema_1 = require("../schemas/message.schema");
const comment_schema_1 = require("../schemas/comment.schema");
const comment_controller_1 = require("../controllers/comment.controller");
const reaction_schema_1 = require("../schemas/reaction.schema");
const reaction_controller_1 = require("../controllers/reaction.controller");
const router = express_1.default.Router();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
router
    .route('/')
    .post((0, validate_1.validate)(message_schema_1.createMessageSchema), message_controller_1.createMessageHandler)
    .get(message_controller_1.getMessagesHandler);
router
    .route('/me')
    .get(message_controller_1.getOwnMessagesHandler);
router
    .route('/comment/:messageId')
    .post((0, validate_1.validate)(comment_schema_1.createCommentSchema), comment_controller_1.createCommentHandler);
router
    .route('/reaction/:messageId')
    .post((0, validate_1.validate)(reaction_schema_1.createReactionSchema), reaction_controller_1.createReactionHandler);
router
    .route('/:messageId')
    .get((0, validate_1.validate)(message_schema_1.getMessageSchema), message_controller_1.getMessageHandler)
    .patch((0, validate_1.validate)(message_schema_1.updateMessageSchema), message_controller_1.updateMessageHandler)
    .delete((0, validate_1.validate)(message_schema_1.deleteMessageSchema), message_controller_1.deleteMessageHandler);
exports.default = router;
