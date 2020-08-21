import { ApproveBandDTO } from "../../model/band/ApproveBandDTO";
import { Authenticator } from "../../services/Authenticator";
import { UserDatabase } from "../../data/UserDatabase";
import { ApproveInputBandDTO } from "../../model/band/ApproveInputBandDTO";
import { AuthenticationData } from "../../model/authenticator/AuthenticatorDTO";

export class BandApproveBusiness {
  async approveBand(input: ApproveInputBandDTO) {
    const authenticator = new Authenticator();
    const authData: AuthenticationData = authenticator.getData(input.token);

    if (authData.role !== "ADMIN") {
      throw new Error("Only admin users can do this approve");
    }

    const bandDatabase = new UserDatabase();
    const findBand = await bandDatabase.getById(input.id);

    if (!findBand) {
      throw new Error("This band is not registered");
    }

    if (findBand.isapproved == 1) {
      throw new Error("This band has already been approved");
    }

    const approveBand = new ApproveBandDTO(input.id, input.isapproved);

    await bandDatabase.approveBand(approveBand);
  }
}
