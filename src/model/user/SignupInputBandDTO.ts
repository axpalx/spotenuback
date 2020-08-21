import { TYPE_USER } from "../../model/user/CreateUserDTO";

export interface SignupInputBandDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: TYPE_USER;
  description: string;
}
