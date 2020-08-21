import { TYPE_USER } from "../../model/user/CreateUserDTO";

export interface SignupInputDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: TYPE_USER;
}
