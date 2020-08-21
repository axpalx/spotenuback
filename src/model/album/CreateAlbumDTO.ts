import { CreateGenreDTO } from "../genre/CreateGenreDTO";

export class CreateAlbumDTO {
  constructor(
    private id: string,
    private name: string,
    private genre_id: CreateGenreDTO[],
    private band_id: string
  ) {}

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getGenre_Id = (): CreateGenreDTO[] => this.genre_id;

  public getBand_Id = (): string => this.band_id;
}
