import { Request, Response } from "express";

import { Database } from "../../data/Database/Database";
import { SignupBusiness } from "../../business/user/SignupBusiness";
import { SignupInputDTO } from "../../model/user/SignupInputDTO";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData: SignupInputDTO = {
      name: req.body.name,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      type: req.body.type,
    };

    const signupBusiness = new SignupBusiness();
    const token = await signupBusiness.signup(userData);

    res.status(200).send({ token });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }

  await Database.destroyConnection();
};
