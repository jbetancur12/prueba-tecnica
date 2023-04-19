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
exports.createReaction = void 0;
const reaction_entity_1 = require("../entities/reaction.entity");
const data_source_1 = require("../utils/data-source");
const reactionRepository = data_source_1.AppDataSource.getRepository(reaction_entity_1.Reaction);
const createReaction = (input, user, message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reactionRepository.save(reactionRepository.create(Object.assign(Object.assign({}, input), { user, message })));
});
exports.createReaction = createReaction;
