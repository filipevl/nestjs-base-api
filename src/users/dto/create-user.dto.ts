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
  cep: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  document: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  complement: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(14, 14)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(2, 2)
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  userAgent: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
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
