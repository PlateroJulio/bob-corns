import { getDbStore } from "@utils/db";
import { Request, Response, NextFunction } from "express";

const requestStore = new Map<string, number>();

export const LimitRequestPerMinute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userKey = req.headers["x-key"];
  const endpoint = req.originalUrl;
  const mapKey = `${userKey}-${endpoint}`;

  const now = Date.now();
  const lastRequestTime = requestStore.get(mapKey);

  if (lastRequestTime && now - lastRequestTime < 60_000) {
    getDbStore().incrementFailed(String(userKey));
    return res.status(429).json({
      error: "Demasidas solicitudes: Solo se permite 1 compra por minuto",
    });
  }

  requestStore.set(mapKey, now);
  next();
};
