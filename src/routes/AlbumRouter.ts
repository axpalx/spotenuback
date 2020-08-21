import express from "express";
import { createAlbum } from "../controllers/album/Album";

export const albumRouter = express.Router();

albumRouter.post("/create", createAlbum);
