  import express from "express";
  import { mainMiddlewares } from "@middlewares/main.middleware";
  import { CustomerController } from "@controllers/index"

  const customerRouter = express.Router();

  customerRouter.get(
    "/all",
    mainMiddlewares(["validateKeyHeader"]),
    CustomerController.getAll
  );

  export { customerRouter };

