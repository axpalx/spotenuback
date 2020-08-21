export enum TYPE_USER {
  BAND = "BAND",
  ADMIN = "ADMIN",
  LISTENER = "PAYING",
  NONLISTENER = "NONPAYING",
}

export class CreateUserDTO {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string,
    private type: TYPE_USER,
    private description: string = "",
    private isapproved: boolean = false
  ) {}

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getEmail = (): string => this.email;

  public getNickName = (): string => this.nickname;

  public getPassword = (): string => this.password;

  public getType = (): TYPE_USER => this.type;

  public getDescription = (): string => this.description;

  public getIsApproved = (): boolean => this.isapproved;
}
