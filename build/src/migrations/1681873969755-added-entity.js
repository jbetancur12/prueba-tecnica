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
exports.AddedEntity1681873969755 = void 0;
class AddedEntity1681873969755 {
    constructor() {
        this.name = 'AddedEntity1681873969755';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "reaction" character varying NOT NULL, "messageId" uuid, "userId" uuid, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_bf5949b492187c5a90f5aeb413a" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1"`);
            yield queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_bf5949b492187c5a90f5aeb413a"`);
            yield queryRunner.query(`DROP TABLE "reaction"`);
        });
    }
}
exports.AddedEntity1681873969755 = AddedEntity1681873969755;
