import { Request, Response } from "express";

import { LoginInputDTO } from "../../model/user/LoginInputDTO";
import { LoginBusiness } from "../../business/user/LoginBusiness";

export const login = async (req: Request, res: Response) => {
  try {
    const userData: LoginInputDTO = {
      email: req.body.email,
      password: req.body.password,
    };

    const loginBusiness = new LoginBusiness();
    const token = await loginBusiness.login(userData);

    res.status(200).send({ token });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
