import express from "express";
import { searchBand } from "../controllers/band/SearchBand";
import { approveBand } from "../controllers/band/ApproveBand";

export const bandRouter = express.Router();

bandRouter.post("/searchband", searchBand);

bandRouter.post("/approve/:id", approveBand);
