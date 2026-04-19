import { Request, Response } from "express";
import { createUser } from "../db/queries/users.js";

export async function handlerCreateUser(req: Request, res: Response) {
  // Check if the request is the correct format
  // { "email": "user@example.com" }
  const body = req.body;

  const isExactShape =
    body && // body is set
    typeof body === "object" && // body is an object
    !Array.isArray(body) && // body is not an Array
    Object.keys(body).length === 1 && // body has exactly ONE key
    typeof body.email === "string"; // body.email is a string

  if (!isExactShape) {
    return res.status(400).json({
      error: "Body in wrong shape delivered",
    });
  }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(body.email)) {
        return res.status(400).json({
            error: 'Email is invalid'
        });
    }

    // Wenn alles passt: 
    const createdUser = await createUser({
        email: body.email
    })

    if (!createdUser) {
        return res.status(409).json({
            error: "User already exists or could not be created",
        });
    }

    return res.status(201).json(createdUser);
}
