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
exports.AddedEntity1681875247775 = void 0;
class AddedEntity1681875247775 {
    constructor() {
        this.name = 'AddedEntity1681875247775';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "message" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "message" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "reaction" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
}
exports.AddedEntity1681875247775 = AddedEntity1681875247775;
