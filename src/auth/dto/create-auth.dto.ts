import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3,20, {message: "Password must be between 3 to 20 chars"})
  public hashpassword: string;
}
