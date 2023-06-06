import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  @ApiProperty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsDate()
  @Type(() => Date)
  @MaxDate(
    () => {
      const maxDate = new Date();
      maxDate.setUTCFullYear(maxDate.getFullYear() - 18);
      return maxDate;
    },
    {
      message: 'You must be greather of 18 years old',
    },
  )
  @ApiProperty({
    format: 'ISO Date',
  })
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  @ApiProperty({ minimum: 11, maxLength: 11 })
  document: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  complement: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @Length(14, 14)
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @Length(2, 2)
  @IsNotEmpty()
  @ApiProperty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userAgent: string;

  @IsLatitude()
  @IsNotEmpty()
  @ApiProperty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  @ApiProperty()
  longitude: number;

  @IsDateString()
  @IsOptional()
  @IsEmpty()
  createdAt?: Date;

  @IsDateString()
  @IsOptional()
  @IsEmpty()
  updatedAt?: Date;

  @IsDateString()
  @IsOptional()
  @IsEmpty()
  deletedAt?: Date;

  constructor(user?: Partial<CreateUserDto>) {
    this.birthday = user?.birthday;
    this.cep = user?.cep;
    this.city = user?.city;
    this.complement = user?.complement;
    this.document = user?.document;
    this.email = user?.email;
    this.latitude = user?.latitude;
    this.longitude = user?.longitude;
    this.name = user?.name;
    this.neighborhood = user?.neighborhood;
    this.number = user?.number;
    this.password = user?.password;
    this.phone = user?.phone;
    this.street = user?.street;
    this.uf = user?.uf;
    this.userAgent = user?.userAgent;
  }
}
