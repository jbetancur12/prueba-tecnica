import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedEntity1681875247775 implements MigrationInterface {
  name = 'AddedEntity1681875247775'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "message" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "message" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdAt"`)
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`)
    await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "createdAt"`)
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
  }
}
