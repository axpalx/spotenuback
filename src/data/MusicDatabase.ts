import { Database } from "./Database/Database";
import { CreateMusicDTO } from "../model/music/CreateMusicDTO";
import { CreateAlbumDTO } from "../model/album/CreateAlbumDTO";

export class MusicDatabase extends Database {
  private static TABLE_NAME = "Music";
  private static RELATION_MUSIC_ALBUM = "relation_music_album";

  public static getTableName = (): string => MusicDatabase.TABLE_NAME;

  async createMusic(input: CreateMusicDTO): Promise<void> {
    try {
      const id = input.getId();
      const name = input.getName();
      const album_id = input.getAlbum_Id();
      await this.getConnection()
        .insert({
          id,
          name,
          album_id,
        })
        .into(MusicDatabase.TABLE_NAME);
      await this.getConnection()
        .insert({ music_id: id, album_id: album_id })
        .into(MusicDatabase.RELATION_MUSIC_ALBUM);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getMusicByName(name: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(MusicDatabase.TABLE_NAME)
        .where({ name });

      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async checkMusicInAlbum(music_id: string, album_id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(MusicDatabase.RELATION_MUSIC_ALBUM)
        .where({ music_id: music_id })
        .andWhere({ album_id: album_id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
