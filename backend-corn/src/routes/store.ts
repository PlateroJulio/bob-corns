import express from "express";
import { mainMiddlewares } from "@middlewares/main.middleware";
import { StoreController } from "@controllers/index";

const storeRouter = express.Router();

storeRouter.post(
  "/buy-corn",
  mainMiddlewares(["validateKeyHeader", "LimitRequestPerMinute"]),
  StoreController.buyCorn
);

storeRouter.get(
  "/purchase-history",
  StoreController.purchaseHistory
);

export { storeRouter };
