import { CreateAlbumInputDTO } from "../../model/album/CreateAlbumInputDTO";
import { CreateAlbumDTO } from "../../model/album/CreateAlbumDTO";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import { AlbumDatabase } from "../../data/AlbumDatabase";
import { GenreDatabase } from "../../data/GenreDatabase";

export class AlbumBusiness {
  async createAlbum(input: CreateAlbumInputDTO) {
    const authentication = new Authenticator();
    const token = await authentication.getData(input.token);

    if (token.role !== "BAND") {
      throw new Error("Only bands can register albums");
    }

    const albumDatabase = new AlbumDatabase();
    const findAlbum = albumDatabase.getAlbumByName(input.name);
    if (findAlbum) {
      throw new Error("This album already exists.");
    }

    throw new Error("parei");

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const genreDatabase = new GenreDatabase();

    const genres = await genreDatabase.getByNameGenre();

    const genre = genres.filter((genre) => {
      return input.genre.includes(genre.getName());
    });

    if (!genre) {
      throw new Error("Genre not found");
    }

    const band_id = token.id;

    const album = new CreateAlbumDTO(id, input.name, genre, band_id);

    await albumDatabase.createAlbun(album);
    return album;
  }
}
