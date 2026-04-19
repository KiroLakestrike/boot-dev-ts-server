import { config } from "../config.js";
export function metricsMiddleware(req, res, next) {
    config.api.fileServerHits++;
    next();
}
