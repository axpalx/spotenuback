import { Database } from "./Database/Database";
import { CreateGenreDTO } from "../model/genre/CreateGenreDTO";

export class GenreDatabase extends Database {
  private static TABLE_NAME = "Genre";

  public static getTableName = (): string => GenreDatabase.TABLE_NAME;

  async createGenre(input: CreateGenreDTO): Promise<void> {
    try {
      const id = input.getId();
      const name = input.getName();
      await this.getConnection()
        .insert({
          id,
          name,
        })
        .into(GenreDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByName(name: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(GenreDatabase.TABLE_NAME)
        .where({ name });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getAllGenre(): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(GenreDatabase.TABLE_NAME);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByNameGenre(): Promise<CreateGenreDTO[]> {
    try {
      const categories: CreateGenreDTO[] = [];

      const result = await this.getConnection()
        .select("*")
        .from(GenreDatabase.TABLE_NAME);

      for (let genre of result) {
        categories.push(CreateGenreDTO.toGenreModel(genre));
      }
      return categories;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
