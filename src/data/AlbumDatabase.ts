import { Database } from "./Database/Database";
import { CreateAlbumDTO } from "../model/album/CreateAlbumDTO";

export class AlbumDatabase extends Database {
  private static TABLE_NAME = "Album";
  private static RELATION_ALBUM_GENRE = "relation_album_genre";

  public static getTableName = (): string => AlbumDatabase.TABLE_NAME;

  async createAlbun(input: CreateAlbumDTO): Promise<void> {
    try {
      const id = input.getId();
      const name = input.getName();
      const band_id = input.getBand_Id();
      await this.getConnection()
        .insert({
          id,
          name,
          band_id,
        })
        .into(AlbumDatabase.TABLE_NAME);

      for (let genre of input.getGenre_Id()) {
        await this.getConnection()
          .insert({ album_id: id, genre_id: genre.getId() })
          .into(AlbumDatabase.RELATION_ALBUM_GENRE);
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getAlbumByName(name: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(AlbumDatabase.TABLE_NAME)
        .where({ name });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
