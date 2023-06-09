import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedEntity1681873969755 implements MigrationInterface {
  name = 'AddedEntity1681873969755'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "reaction" character varying NOT NULL, "messageId" uuid, "userId" uuid, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD CONSTRAINT "FK_bf5949b492187c5a90f5aeb413a" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reaction" DROP CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1"`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" DROP CONSTRAINT "FK_bf5949b492187c5a90f5aeb413a"`
    )
    await queryRunner.query(`DROP TABLE "reaction"`)
  }
}
