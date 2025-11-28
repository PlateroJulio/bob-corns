import { IPurchaseHistory } from "types";

export const getNextCustomerKey = (data: IPurchaseHistory[]) => {
  if (data.length === 0) return "001";

  const numbers = data.map(item => Number(item.key));

  // Obtener el mayor número actual
  const max = Math.max(...numbers);

  // Formatear con padding a 3 dígitos
  const nextNumber = (max + 1).toString().padStart(3, "0");

  return nextNumber
};
