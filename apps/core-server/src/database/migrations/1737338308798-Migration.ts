import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737338308798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`TB_TICKET\`
        ADD COLUMN \`epic_order_id\` INT NOT NULL DEFAULT 1;
    `);
    await queryRunner.query(`
        ALTER TABLE \`TB_TICKET\`
        ADD COLUMN \`sprint_order_id\` INT NOT NULL DEFAULT 1;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`TB_TICKET\`
        DROP COLUMN \`sprint_order_id\`;
    `);
    await queryRunner.query(`
        ALTER TABLE \`TB_TICKET\`
        DROP COLUMN \`epic_order_id\`;
    `);
  }
}
