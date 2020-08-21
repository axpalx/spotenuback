import { Request, Response } from "express";
import { BandSearchBusiness } from "../../business/band/BandSearchBusiness";

export const searchBand = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const bandBusiness = new BandSearchBusiness();
    const bandList = await bandBusiness.searchBand({ token });
    res.status(200).send(bandList);
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
