export class CreateUserDto {
  cep: string;
  city: string;
  birthday: string;
  document: string;
  email: string;
  name: string;
  neighborhood: string;
  number: string;
  complement: string;
  password: string;
  phone: string;
  uf: string;
  street: string;
  userAgent: string;
  latitude: number;
  longitude: number;

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
