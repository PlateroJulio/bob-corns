import { getDbStore } from "@utils/db";
import { getNextCustomerKey } from "@utils/generete-key";
import { Request, Response } from "express";
import { CustomerSchema } from "schemas/customer";

export const CustomerController = {
  getAll: (_req: Request, response: Response) => {
    const store = getDbStore();

    const customers = store.all().sort((a, b) => {
      return Number(b.key) - Number(a.key);
    });

    response.status(200).json({
      message: "Todos los compradores con éxito",
      data: customers,
    });
  },
  create: (req: Request, response: Response) => {
    const body = CustomerSchema.create.parse(req.body);

    const store = getDbStore();

    const customers = store.all();
    const nextNumber = getNextCustomerKey(customers);
    const key = nextNumber;
    const pathImage = `https://i.pravatar.cc/150?img=${nextNumber}`;

    const item = {
      key,
      ...body,
      pathImage,
    };

    store.upsert(item);

    response.status(200).json({
      message: "Creacion de comprador con éxito",
      data: item,
    });
  },
};
