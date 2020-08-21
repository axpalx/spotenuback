import { TYPE_USER } from "../../model/user/CreateUserDTO";

export interface SignupInputAdminDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: TYPE_USER;
  token: string;
}
