import { Database } from "./Database/Database";
import { CreateUserDTO } from "../model/user/CreateUserDTO";
import { ApproveBandDTO } from "../model/band/ApproveBandDTO";

export class UserDatabase extends Database {
  private static TABLE_NAME = "User";

  public static getTableName = (): string => UserDatabase.TABLE_NAME;

  async createUser(input: CreateUserDTO): Promise<void> {
    try {
      const id = input.getId();
      const name = input.getName();
      const email = input.getEmail();
      const nickName = input.getNickName();
      const password = input.getPassword();
      const type = input.getType();
      const description = input.getDescription();
      const isApproved = input.getIsApproved();
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          nickName,
          password,
          type,
          description,
          isApproved,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id });

      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllBand(): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("name", "email", "nickname", "isapproved")
        .from(UserDatabase.TABLE_NAME)
        .where("type", "=", "BAND");

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async approveBand(input: ApproveBandDTO): Promise<any> {
    try {
      const id = input.getId();
      const isapproved = input.getIsApproved();
      await this.getConnection().raw(`
       UPDATE ${UserDatabase.TABLE_NAME} 
       SET isapproved = ${isapproved} WHERE id = "${id}"
       `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
