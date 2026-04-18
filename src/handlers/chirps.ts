import { Request, Response } from "express";
import { BadRequestError } from "../errors/customErrors.js";

const PROFANITY = ["kerfuffle", "sharbert", "fornax"];

export async function handlerValidateChirp(req: Request, res: Response) {
  const chirp: string | undefined = req.body.body;

  if (!chirp) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }

  if (chirp.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140");
  }

  const cleanedBody = removeProfanity(chirp);

  res.status(200).json({ cleanedBody });
}

function removeProfanity(chirp: string): string {
  return chirp
    .split(" ")
    .map((word) => (PROFANITY.includes(word.toLowerCase()) ? "****" : word))
    .join(" ");
}
