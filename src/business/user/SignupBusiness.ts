import { SignupInputDTO } from "../../model/user/SignupInputDTO";
import { UserDatabase } from "../../data/UserDatabase";
import { CreateUserDTO } from "../../model/user/CreateUserDTO";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { Authenticator } from "../../services/Authenticator";

export class SignupBusiness {
  async signup(input: SignupInputDTO) {
    if (!input.email || input.email.indexOf("@") === -1) {
      throw new Error("Invalid E-mail");
    }

    if (!input.password || input.password.length < 6) {
      throw new Error("Password is less than 6 characters or empty");
    }

    const cipherText = await new HashManager().hash(input.password);

    const idGenerator = new IdGenerator();
    const id = await idGenerator.generateId();

    const userDatabase = new UserDatabase();

    if (input.type === "BAND") {
      const isapproved = 0;
    }

    const user = new CreateUserDTO(
      id,
      input.name,
      input.email,
      input.nickname,
      cipherText,
      input.type
    );

    await userDatabase.createUser(user);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });
    return token;
  }
}
