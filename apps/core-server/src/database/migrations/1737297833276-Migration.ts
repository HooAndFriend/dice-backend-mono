import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737297833276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE \`TB_TICKET\`
          ADD COLUMN \`priority\` ENUM('HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST') NOT NULL DEFAULT 'MEDIUM' COMMENT '우선 순위';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE \`TB_TICKET\`
          DROP COLUMN \`priority\`;
        `);
  }
}
