import { getDbStore } from "@utils/db";
import { Request, Response } from "express";

export const StoreController = {
  buyCorn: (req: Request, response: Response) => {
    const key = String(req.headers["x-key"]);

    const store = getDbStore();

    const findCustomer = store.find(key);

    if (findCustomer) {
      store.incrementSuccess(key);
      response.status(200).json({ message: "🌽" });
    } else response.status(404).json({ message: "Not found customer!" });
  },
  purchaseHistory: (_req: Request, response: Response) => {
    const store = getDbStore();

    const customers = store.all();

    response.status(200).json({
      message: "Historial de compras con éxito",
      data: customers,
    });
  },
};
