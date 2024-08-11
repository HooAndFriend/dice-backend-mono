// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsNumber } from 'class-validator';

export default class RequestSprintSaveTicketDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  sprintId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of ticket IDs to add to the sprint',
  })
  @IsArray()
  @IsNumber({}, { each: true }) // Ensure that each element in the array is a number
  ticketIds: number[];
}
