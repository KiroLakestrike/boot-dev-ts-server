import express from "express";
import { config } from "./config.js";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/healthz", handlerReadiness);
app.get("/admin/metrics", handlerAdminMetrics);
app.post("/admin/reset", handlerAdminReset);
app.post("/api/validate_chirp", handlerValidateChirp);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
export function handlerReadiness(req, res) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
}
export function middlewareMetricsInc(req, res, next) {
    config.fileserverHits++;
    next();
}
export function handlerAdminMetrics(req, res) {
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`
<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
  </body>
</html>`);
}
export function handlerAdminReset(req, res) {
    config.fileserverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
}
export function handlerValidateChirp(req, res) {
    const chirp = req.body.body;
    if (!chirp) {
        res.status(400).json({ error: "Something went wrong" });
        return;
    }
    if (chirp.length > 140) {
        res.status(400).json({ error: "Chirp is too long" });
        return;
    }
    res.status(200).json({ valid: true });
}
