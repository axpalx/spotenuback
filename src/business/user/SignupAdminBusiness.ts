import { SignupInputAdminDTO } from "../../model/user/SignupInputAdminDTO";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { UserDatabase } from "../../data/UserDatabase";
import { CreateUserDTO } from "../../model/user/CreateUserDTO";
import { Authenticator } from "../../services/Authenticator";
import { AuthenticationData } from "../../model/authenticator/AuthenticatorDTO";

export class SignupAdminBusiness {
  async signupAdmin(input: SignupInputAdminDTO) {
    const authenticator = new Authenticator();
    const authData: AuthenticationData = authenticator.getData(input.token);

    if (authData.role !== "ADMIN") {
      throw new Error("Only admin users can register admin users");
    }

    if (!input.email || input.email.indexOf("@") === -1) {
      throw new Error("Invalid E-mail");
    }

    if (input.type === "ADMIN" && input.password.length < 10) {
      throw new Error("Password is less than 10 characters or empty");
    }

    const cipherText = await new HashManager().hash(input.password);

    const idGenerator = new IdGenerator();
    const id = await idGenerator.generateId();

    const userDatabase = new UserDatabase();
    const user = new CreateUserDTO(
      id,
      input.name,
      input.email,
      input.nickname,
      cipherText,
      input.type
    );

    await userDatabase.createUser(user);

    const token = authenticator.generateToken({ id, role: input.type });
    return token;
  }
}
