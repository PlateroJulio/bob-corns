import { IPurchaseHistory } from "types";
import { dataSeed } from "./customer";

export class DbStore {
  private store: Map<string, IPurchaseHistory>;

  constructor(seed: IPurchaseHistory[] = []) {
    this.store = new Map(seed.map(item => [item.key, item]));
  }

  upsert(item: IPurchaseHistory): IPurchaseHistory {
    this.store.set(item.key, item);
    return item;
  }

  find(key: string): IPurchaseHistory | undefined {
    return this.store.get(key);
  }

  all(): IPurchaseHistory[] {
    return Array.from(this.store.values());
  }

  incrementSuccess(key: string): IPurchaseHistory {
    const item = this.store.get(key);
    if (!item) throw new Error("Item not found");
    item.quantitySuccess++;
    return item;
  }

  incrementFailed(key: string): IPurchaseHistory {
    const item = this.store.get(key);
    if (!item) throw new Error("Item not found");
    item.quantityFailed++;
    return item;
  }
}

let instance: DbStore | null = null;

export const getDbStore = () => {
  if (!instance) {
    instance = new DbStore(dataSeed);
  }
  return instance;
};
