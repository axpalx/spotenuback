import { Request, Response } from "express";
import { CreateInputGenreDTO } from "../../model/genre/CreateInputGenreDTO";
import { GenreBusiness } from "../../business/genre/GenreBusiness";

export const genre = async (req: Request, res: Response) => {
  try {
    const adminToken = req.headers.authorization as string;
    const genreData: CreateInputGenreDTO = {
      name: req.body.name,
      token: adminToken,
    };

    const genreBusiness = new GenreBusiness();

    await genreBusiness.createGenre(genreData);

    res.status(200).send({ message: "Genre successfully registered." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
