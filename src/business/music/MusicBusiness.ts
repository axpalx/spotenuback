import { CreateMusicInputDTO } from "../../model/music/CreateMusicInputDTO";
import { Authenticator } from "../../services/Authenticator";
import { MusicDatabase } from "../../data/MusicDatabase";
import { AlbumDatabase } from "../../data/AlbumDatabase";
import { CreateMusicDTO } from "../../model/music/CreateMusicDTO";
import { IdGenerator } from "../../services/IdGenerator";

export class MusicBusiness {
  async createMusic(input: CreateMusicInputDTO) {
    const authentication = new Authenticator();
    const token = await authentication.getData(input.token);

    const albumDatabase = new AlbumDatabase();
    const findAlbum = await albumDatabase.getAlbumByName(input.album);

    if (!findAlbum) {
      throw new Error("Album not found.");
    }

    const musicDatabase = new MusicDatabase();
    const findMusic = await musicDatabase.getMusicByName(input.name);

    if (findMusic) {
      console.log("entrei no if");
      const checkMusicInAlbum = await musicDatabase.checkMusicInAlbum(
        findMusic.id,
        findAlbum.id
      );

      if (checkMusicInAlbum) {
        throw new Error(
          "The same song cannot be registered twice on the same album."
        );
      }
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const music = new CreateMusicDTO(id, input.name, findAlbum.id);

    await musicDatabase.createMusic(music);
    return music;
  }
}
