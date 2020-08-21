import { LoginInputDTO } from "../../model/user/LoginInputDTO";
import { UserDatabase } from "../../data/UserDatabase";
import { HashManager } from "../../services/HashManager";
import { Authenticator } from "../../services/Authenticator";

export class LoginBusiness {
  async login(input: LoginInputDTO) {
    const userDataBase = new UserDatabase();
    const user = await userDataBase.getByEmail(input.email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashManager = new HashManager();
    const passwordIsCorrect = await hashManager.compare(
      input.password,
      user.password
    );

    if (!passwordIsCorrect) {
      throw new Error("Invalid password");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id, role: user.type });

    return token;
  }
}
