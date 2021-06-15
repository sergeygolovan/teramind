import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;
  }