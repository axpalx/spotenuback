import { Request, Response } from "express";

import { Database } from "../../data/Database/Database";
import { SignupInputAdminDTO } from "../../model/user/SignupInputAdminDTO";
import { SignupAdminBusiness } from "../../business/user/SignupAdminBusiness";

export const signupAdmin = async (req: Request, res: Response) => {
  try {
    const adminToken = req.headers.authorization as string;

    const userData: SignupInputAdminDTO = {
      name: req.body.name,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      type: req.body.type,
      token: adminToken,
    };

    const signupBusiness = new SignupAdminBusiness();
    await signupBusiness.signupAdmin(userData);

    res
      .status(200)
      .send({ message: "Administrator user registered successfully." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }

  await Database.destroyConnection();
};
