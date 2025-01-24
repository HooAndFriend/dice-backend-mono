import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737296313068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`TB_EPIC\`
      ADD COLUMN \`ticketSettingId\` INT;
    `);

    await queryRunner.query(`
      ALTER TABLE \`TB_EPIC\`
      ADD CONSTRAINT \`FK_ticketSetting_epic\`
      FOREIGN KEY (\`ticketSettingId\`) REFERENCES \`TB_TICKET_SETTING\`(\`ticketSettingId\`) 
      ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`TB_EPIC\`
      DROP CONSTRAINT \`FK_ticketSetting_epic\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`TB_EPIC\`
      DROP COLUMN \`ticketSettingId\`;
    `);
  }
}
