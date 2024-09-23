import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @Transform(({ value }) => moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD'))
  @IsDateString(
    {},
    { message: 'Date de naissance must be a valid ISO 8601 date string' },
  )
  @IsNotEmpty({ message: 'Date de naissance is required' })
  dueDate: string;

  @IsEnum(['Pending', 'In Progress', 'Completed'], {
    message: 'Status must be one of: Pending, In Progress, Completed',
  })
  status: string;
}
