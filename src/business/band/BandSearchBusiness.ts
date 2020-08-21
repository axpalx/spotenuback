import { SearchBandDTO } from "../../model/band/SearchBandDTO";
import { Authenticator } from "../../services/Authenticator";
import { UserDatabase } from "../../data/UserDatabase";
import { AuthenticationData } from "../../model/authenticator/AuthenticatorDTO";

export class BandSearchBusiness {
  async searchBand(input: SearchBandDTO) {
    const authenticator = new Authenticator();
    const authData: AuthenticationData = authenticator.getData(input.token);

    if (authData.role !== "ADMIN") {
      throw new Error("Only admin users can do this search");
    }

    const userDatabase = new UserDatabase();
    const bandList = await userDatabase.getAllBand();

    return bandList;
  }
}
