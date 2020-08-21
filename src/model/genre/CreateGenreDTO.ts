export class CreateGenreDTO {
  constructor(private id: string, private name: string) {}
  public getId = (): string => this.id;
  public getName = (): string => this.name;

  static toGenreModel(genre: any): CreateGenreDTO {
    return new CreateGenreDTO(genre.id, genre.name);
  }
}
