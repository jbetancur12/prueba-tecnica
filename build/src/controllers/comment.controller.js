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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentHandler = void 0;
const comment_service_1 = require("../services/comment.service");
const user_service_1 = require("../services/user.service");
const message_service_1 = require("../services/message.service");
const createCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUserById)(res.locals.user.id);
        const message = yield (0, message_service_1.findMessageById)(req.params.messageId);
        const comment = yield (0, comment_service_1.createComment)(req.body, user, message);
        console.log(comment);
        // res.status(201).json({
        //   status: 'success',
        //   data: {
        //     comment,
        //   },
        // });
    }
    catch (err) {
        next(err);
    }
});
exports.createCommentHandler = createCommentHandler;
