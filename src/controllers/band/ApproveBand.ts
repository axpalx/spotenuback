import { Request, Response } from "express";
import { BandApproveBusiness } from "../../business/band/BandApproveBusiness";
import { ApproveInputBandDTO } from "../../model/band/ApproveInputBandDTO";

export const approveBand = async (req: Request, res: Response) => {
  try {
    const userData: ApproveInputBandDTO = {
      id: req.params.id,
      token: req.headers.authorization as string,
      isapproved: req.body.isapproved,
    };

    const approveBandBusiness = new BandApproveBusiness();
    const approve = await approveBandBusiness.approveBand(userData);

    res.status(200).send({ message: "Approved band" });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
