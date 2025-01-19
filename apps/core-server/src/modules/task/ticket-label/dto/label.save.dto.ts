// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsEnum, IsString } from 'class-validator';
import TicketLabel from '../domain/ticket.label.entity';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';

export default class RequestLabelSaveDto {
  @ApiProperty({ example: 'SCN' })
  @IsString()
  name: string;

  @ApiProperty({ example: '해당 타입은 이거 입니다.' })
  @IsString()
  description: string;

  @ApiProperty({ example: '#fff' })
  @IsString()
  bgColor: string;

  @ApiProperty({ example: 'black' })
  @IsString()
  color: string;

  public toTicketLabel(workspace: Workspace): TicketLabel {
    const ticketLabel = new TicketLabel();
    ticketLabel.name = this.name;
    ticketLabel.description = this.description;
    ticketLabel.bgColor = this.bgColor;
    ticketLabel.color = this.color;
    ticketLabel.workspace = workspace;
    return ticketLabel;
  }
}
