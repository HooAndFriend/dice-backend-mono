import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737714022009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE TB_BOARD_MENTION (
                mentionId INT AUTO_INCREMENT PRIMARY KEY,
                blockId INT,
                mentionerId INT,
                mentionedUserId INT,
                mentionKey VARCHAR(255) NOT NULL,
                created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT FK_block FOREIGN KEY (blockId) REFERENCES TB_BOARD_BLOCK(boardBlockId) ON DELETE CASCADE,
                CONSTRAINT FK_mentioner FOREIGN KEY (mentionerId) REFERENCES TB_USER(userId),
                CONSTRAINT FK_mentionedUser FOREIGN KEY (mentionedUserId) REFERENCES TB_USER(userId)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE TB_BOARD_MENTION`);
  }
}
