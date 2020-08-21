export class ApproveBandDTO {
  constructor(private id: string, private isapproved: string) {}
  public getId = (): string => this.id;

  public getIsApproved = (): string => this.isapproved;
}
