import { Request, Response } from "express";
import { CreateAlbumInputDTO } from "../../model/album/CreateAlbumInputDTO";
import { AlbumBusiness } from "../../business/album/AlbumBusiness";

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const albumData: CreateAlbumInputDTO = {
      name: req.body.name,
      genre: req.body.genre,
      token: req.headers.authorization as string,
    };

    const albumBusiness = new AlbumBusiness();
    await albumBusiness.createAlbum(albumData);

    res.status(200).send({ message: "Album successfully registered." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
