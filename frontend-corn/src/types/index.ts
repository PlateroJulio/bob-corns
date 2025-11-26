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