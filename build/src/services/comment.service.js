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
exports.createComment = void 0;
const comment_entity_1 = require("../entities/comment.entity");
const data_source_1 = require("../utils/data-source");
const commentRepository = data_source_1.AppDataSource.getRepository(comment_entity_1.Comment);
const createComment = (input, user, message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield commentRepository.save(commentRepository.create(Object.assign(Object.assign({}, input), { user, message })));
});
exports.createComment = createComment;
