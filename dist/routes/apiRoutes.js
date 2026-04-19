import { Router } from "express";
import { handlerValidateChirp } from "../handlers/chirps.js";
import { handlerCreateUser } from "../handlers/users.js";
export const apiRouter = Router();
apiRouter.post("/validate_chirp", handlerValidateChirp);
apiRouter.post("/users", handlerCreateUser);
