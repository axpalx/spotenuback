import express from "express";
import { createMusic } from "../controllers/music/Music";

export const musicRouter = express.Router();

musicRouter.post("/create", createMusic);
