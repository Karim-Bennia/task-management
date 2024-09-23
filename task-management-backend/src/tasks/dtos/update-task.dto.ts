import { IsString, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
/*import { Transform } from 'class-transformer';
import * as moment from 'moment';*/

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  @MinLength(10)
  description: string;

  /*@Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate()) // Make sure date is properly transformed
  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string' })
  @IsNotEmpty({ message: 'Date de naissance is required' })
  dueDate: Date;*/

  @IsEnum(['Pending', 'In Progress', 'Completed'], {
    message: 'Status must be one of: Pending, In Progress, Completed',
  })
  status: string;
}
