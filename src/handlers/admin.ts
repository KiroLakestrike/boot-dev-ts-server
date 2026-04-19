import { Request, Response } from "express";
import { config } from "../config.js";
import { resetUser } from "../db/queries/users.js";

export function handlerAdminMetrics(req: Request, res: Response) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`
<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited  ${config.api.fileServerHits}  times!</p>
  </body>
</html>`);
}

export async function handlerAdminReset(req: Request, res: Response) {
  if (config.api.platform !== "dev") {
    return res.sendStatus(403);
  }

  config.api.fileServerHits = 0;
  await resetUser();

  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("OK");
}
