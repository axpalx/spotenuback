import { Authenticator } from "../../services/Authenticator";
import { AuthenticationData } from "../../model/authenticator/AuthenticatorDTO";
import { GenreDatabase } from "../../data/GenreDatabase";
import { GenreListInputDTO } from "../../model/genre/GenreListInputDTO";

export class GenreListBusiness {
  async genreList(input: GenreListInputDTO) {
    const authenticator = new Authenticator();
    const authData: AuthenticationData = authenticator.getData(input.token);

    if (!authData) {
      throw new Error("Only registered users can generate the gender list.");
    }

    const genreDatabase = new GenreDatabase();
    const genreList = await genreDatabase.getAllGenre();

    return genreList;
  }
}
