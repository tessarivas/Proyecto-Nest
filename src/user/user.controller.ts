/*
import { PartialType } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

export class UpdateUserDto extends PartialType(User) {}
*/

import { Controller } from '@nestjs/common';
// other imports

@Controller('user')
export class UserController {
  // controller methods
}