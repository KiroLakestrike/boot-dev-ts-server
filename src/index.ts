import express from "express";
import { adminRouter } from "./routes/adminRoutes.js";
import { apiRouter } from "./routes/apiRoutes.js";
import { metricsMiddleware } from "./middleware/metrics.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { handlerReadiness } from "./handlers/health.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/app", metricsMiddleware, express.static("./src/app"));

app.get("/healthz", handlerReadiness);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
