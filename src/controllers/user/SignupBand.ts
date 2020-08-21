import { Request, Response } from "express";

import { Database } from "../../data/Database/Database";
import { SignupInputBandDTO } from "../../model/user/SignupInputBandDTO";
import { SignupBandBusiness } from "../../business/user/SignupBandBusiness";

export const signupBand = async (req: Request, res: Response) => {
  try {
    const userData: SignupInputBandDTO = {
      name: req.body.name,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      type: req.body.type,
      description: req.body.description,
    };

    const signupBusiness = new SignupBandBusiness();
    const token = await signupBusiness.signup(userData);

    res.status(200).send({ message: "Band successfully registered." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }

  await Database.destroyConnection();
};
