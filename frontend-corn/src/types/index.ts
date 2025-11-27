export interface IPurchaseHistory {
  key: string;
  name: string
  pathImage: string
  quantitySuccess: number
  quantityFailed: number
}

export interface IHistory {
  data: IPurchaseHistory[]
  message: string
}

export interface ICreateCustomer {
  name: string
  quantitySuccess: number
  quantityFailed: number
}