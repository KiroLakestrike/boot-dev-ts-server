import { Router } from "express";
import { handlerValidateChirp } from "../handlers/chirps.js";

export const apiRouter = Router();

apiRouter.post("/validate_chirp", handlerValidateChirp);