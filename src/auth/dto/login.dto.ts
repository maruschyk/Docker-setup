import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'user@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'securepass123' })
  password: string;
}
