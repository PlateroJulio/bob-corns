import { Request, Response, NextFunction } from "express";

export const validateKeyHeader = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers["x-key"];
  if (key === "" || key === undefined) {
    return res.status(401).json({
      error: "Acceso no autorizado: Encabezado x-key inválido",
    });
  }

  next();
};
