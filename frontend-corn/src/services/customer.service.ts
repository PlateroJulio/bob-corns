import api from './api'
import type { ICreateCustomer, IHistory, IPurchaseHistory } from '@/types'

const entity = '/customer'

export const customerService = {
  getCustomers: () => api.get<IHistory>(`${entity}/all`, {}).then((res) => res.data),
  create: (data: ICreateCustomer) =>
    api.post<IPurchaseHistory>(`${entity}/create`, data, {}).then((res) => res.data),
}
