"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        messageId: (0, zod_1.string)(),
    }),
};
exports.createCommentSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), { body: (0, zod_1.object)({
        content: (0, zod_1.string)({
            required_error: 'Content is required',
        })
    }) }));
