import { Router } from "express";
import { handlerAdminMetrics, handlerAdminReset } from "../handlers/admin.js";

export const adminRouter = Router();

adminRouter.get("/metrics", handlerAdminMetrics);
adminRouter.post("/reset", handlerAdminReset);
