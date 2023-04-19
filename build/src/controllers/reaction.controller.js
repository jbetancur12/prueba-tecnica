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
exports.createReactionHandler = void 0;
const reaction_service_1 = require("../services/reaction.service");
const user_service_1 = require("../services/user.service");
const message_service_1 = require("../services/message.service");
const appError_1 = __importDefault(require("../utils/appError"));
const createReactionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUserById)(res.locals.user.id);
        const message = yield (0, message_service_1.findMessages)({ id: req.params.messageId }, {}, { user: true });
        if (message[0].user.id === (user === null || user === void 0 ? void 0 : user.id)) {
            return next(new appError_1.default(404, 'You cannot react to your own message'));
        }
        const reaction = yield (0, reaction_service_1.createReaction)(req.body, user, message[0]);
        res.status(201).json({
            status: 'success',
            data: {
                reaction,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createReactionHandler = createReactionHandler;
