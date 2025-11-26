import { getDbStore } from "@utils/db";
import { Request, Response } from "express";

export const CustomerController = {
  getAll: (_req: Request, response: Response) => {
    const store = getDbStore();

    const customers = store.all();

    response.status(200).json({
      message: "Todos los usuarios con éxito",
      data: customers,
    });
  },
};
