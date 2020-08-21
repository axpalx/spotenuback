import { Request, Response } from "express";
import { GenreListInputDTO } from "../../model/genre/GenreListInputDTO";
import { GenreListBusiness } from "../../business/genre/GenreListBusiness";

export const genreList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const dataList: GenreListInputDTO = { token: token };

    const genreBusiness = new GenreListBusiness();
    const list = await genreBusiness.genreList(dataList);

    res.status(200).send(list);
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
