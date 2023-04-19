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
exports.deleteMessageHandler = exports.updateMessageHandler = exports.getMessagesHandler = exports.getOwnMessagesHandler = exports.getMessageHandler = exports.createMessageHandler = void 0;
const message_service_1 = require("../services/message.service");
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const createMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUserById)(res.locals.user.id);
        const message = yield (0, message_service_1.createMessage)(req.body, user);
        res.status(201).json({
            status: 'success',
            data: {
                message,
            },
        });
    }
    catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Message with that title already exist',
            });
        }
        next(err);
    }
});
exports.createMessageHandler = createMessageHandler;
const getMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, message_service_1.getMessage)(req.params.messageId);
        if (!message) {
            return next(new appError_1.default(404, 'Message with that ID not found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                message,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getMessageHandler = getMessageHandler;
const getOwnMessagesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUserById)(res.locals.user.id);
        const messages = yield (0, message_service_1.findMessages)({ user: { id: user === null || user === void 0 ? void 0 : user.id } }, {}, { user: true });
        res.status(200).json({
            status: 'success',
            data: {
                messages,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getOwnMessagesHandler = getOwnMessagesHandler;
const getMessagesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield (0, message_service_1.findMessages)({}, { id: true, title: true, content: true, "user": { id: true }, comments: { content: true }, reactions: { reaction: true }, createdAt: true }, { comments: true, user: true, reactions: true });
        res.status(200).json(messages);
    }
    catch (err) {
        next(err);
    }
});
exports.getMessagesHandler = getMessagesHandler;
const updateMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, message_service_1.getMessage)(req.params.messageId);
        if (!message) {
            return next(new appError_1.default(404, 'Message with that ID not found'));
        }
        Object.assign(message, req.body);
        const updatedMessage = yield message.save();
        res.status(200).json({
            status: 'success',
            data: {
                message: updatedMessage,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateMessageHandler = updateMessageHandler;
const deleteMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, message_service_1.getMessage)(req.params.messageId);
        const user = yield (0, user_service_1.findUserById)(res.locals.user.id);
        const messageisFromUser = yield (0, message_service_1.findMessages)({ user: { id: user === null || user === void 0 ? void 0 : user.id }, id: req.params.messageId }, {}, { user: true });
        if (!message) {
            return next(new appError_1.default(404, 'Message with that ID not found'));
        }
        if (messageisFromUser.length === 0) {
            return next(new appError_1.default(404, 'Message do not belong to User'));
        }
        yield message.remove();
        res.status(204).json({
            status: 'OK',
            delete: true,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteMessageHandler = deleteMessageHandler;
