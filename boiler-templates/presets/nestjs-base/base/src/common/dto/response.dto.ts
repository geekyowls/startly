import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 50,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 1000,
  })
  readonly total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 20,
  })
  readonly totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  readonly hasNext: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  readonly hasPrevious: boolean;
}

export class BaseResponseDto<T = any> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  readonly success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  readonly message: string;

  @ApiPropertyOptional({
    description: 'Response data',
  })
  readonly data?: T;

  @ApiPropertyOptional({
    description: 'Timestamp of the response',
    example: '2025-09-15T22:30:00.000Z',
  })
  readonly timestamp?: string;

  @ApiPropertyOptional({
    description: 'Error details if any',
  })
  readonly error?: any;
}

export class PaginatedResponseDto<T = any> extends BaseResponseDto<T[]> {
  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  readonly pagination: PaginationMetaDto;

  @ApiProperty({
    description: 'List of items',
    isArray: true,
  })
  readonly data: T[];
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Indicates the request failed',
    example: false,
  })
  readonly success: boolean = false;

  @ApiProperty({
    description: 'Error message',
    example: 'Validation failed',
  })
  readonly message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  readonly statusCode: number;

  @ApiPropertyOptional({
    description: 'Detailed error information',
    example: ['field1 is required', 'field2 must be a string'],
  })
  readonly details?: string[] | object;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2025-09-15T22:30:00.000Z',
  })
  readonly timestamp: string;

  @ApiProperty({
    description: 'Request path that caused the error',
    example: '/api/v1/users',
  })
  readonly path: string;
}