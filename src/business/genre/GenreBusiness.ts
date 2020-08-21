import { CreateInputGenreDTO } from "../../model/genre/CreateInputGenreDTO";
import { Authenticator } from "../../services/Authenticator";
import { AuthenticationData } from "../../model/authenticator/AuthenticatorDTO";
import { IdGenerator } from "../../services/IdGenerator";
import { CreateGenreDTO } from "../../model/genre/CreateGenreDTO";
import { GenreDatabase } from "../../data/GenreDatabase";

export class GenreBusiness {
  async createGenre(input: CreateInputGenreDTO) {
    const authenticator = new Authenticator();
    const authData: AuthenticationData = authenticator.getData(input.token);

    if (authData.role !== "ADMIN") {
      throw new Error("Only admin users can enter gender");
    }

    const genreDatabase = new GenreDatabase();
    const findGenre = await genreDatabase.getByName(input.name);

    if (findGenre) {
      throw new Error("This genre already exists");
    }

    const idGenerator = new IdGenerator();
    const id = await idGenerator.generateId();

    const genre = new CreateGenreDTO(id, input.name);

    await genreDatabase.createGenre(genre);
  }
}
