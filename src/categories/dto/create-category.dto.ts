import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    example: 'Phones',
    description: 'Назва категорії',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
