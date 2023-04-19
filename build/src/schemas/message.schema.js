"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageSchema = exports.updateMessageSchema = exports.getMessageSchema = exports.createMessageSchema = void 0;
const zod_1 = require("zod");
exports.createMessageSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required',
        }),
        content: (0, zod_1.string)({
            required_error: 'Content is required',
        })
    }),
});
const params = {
    params: (0, zod_1.object)({
        messageId: (0, zod_1.string)(),
    }),
};
exports.getMessageSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateMessageSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), { body: (0, zod_1.object)({
        title: (0, zod_1.string)(),
        content: (0, zod_1.string)(),
    }).partial() }));
exports.deleteMessageSchema = (0, zod_1.object)(Object.assign({}, params));
