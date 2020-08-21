import express from "express";
import { genre } from "../controllers/genre/Genre";
import { genreList } from "../controllers/genre/GenreList";

export const genreRouter = express.Router();

genreRouter.post("/create", genre);

genreRouter.post("/list", genreList);
