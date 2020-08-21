import { Request, Response } from "express";
import { CreateMusicInputDTO } from "../../model/music/CreateMusicInputDTO";
import { MusicBusiness } from "../../business/music/MusicBusiness";

export const createMusic = async (req: Request, res: Response) => {
  try {
    const musicData: CreateMusicInputDTO = {
      name: req.body.name,
      album: req.body.album,
      token: req.headers.authorization as string,
    };

    const musicBusiness = new MusicBusiness();
    await musicBusiness.createMusic(musicData);

    res.status(200).send({ message: "Music succesfully registered." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
