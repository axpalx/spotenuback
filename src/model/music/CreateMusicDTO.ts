export class CreateMusicDTO {
  constructor(
    private id: string,
    private name: string,
    private album_id: string
  ) {}

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getAlbum_Id = (): string => this.album_id;
}
