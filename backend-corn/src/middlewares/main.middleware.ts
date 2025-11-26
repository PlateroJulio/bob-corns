import { validateKeyHeader } from "./validate-key-header.midleware";
import { LimitRequestPerMinute } from "./limit-request-store.middleware";
import { NextFunction, Request, Response } from "express";

const middlewareRegistry: Record<string, any> = {
  validateKeyHeader,
  LimitRequestPerMinute,
};

export const mainMiddlewares = (middlewares: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const name of middlewares) {
      const mw = middlewareRegistry[name];
      if (!mw) {
        return res
          .status(500)
          .json({ error: `Middleware no encontrado: ${name}` });
      }

      let finished = false;
      await new Promise<void>((resolve) => {
        mw(req, res, () => {
          finished = true;
          resolve();
        });
      });

      if (!finished) return;
    }

    next();
  };
};
