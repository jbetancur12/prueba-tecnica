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
exports.findMessages = exports.findMessageById = exports.getMessage = exports.createMessage = void 0;
const message_entity_1 = require("../entities/message.entity");
const data_source_1 = require("../utils/data-source");
const messageRepository = data_source_1.AppDataSource.getRepository(message_entity_1.Message);
const createMessage = (input, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield messageRepository.save(messageRepository.create(Object.assign(Object.assign({}, input), { user })));
});
exports.createMessage = createMessage;
const getMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield messageRepository.findOneBy({ id: messageId });
});
exports.getMessage = getMessage;
const findMessageById = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield messageRepository.findOneBy({ id: messageId });
});
exports.findMessageById = findMessageById;
const findMessages = (where = {}, select = {}, relations = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield messageRepository.find({
        where,
        select,
        relations,
    });
});
exports.findMessages = findMessages;
