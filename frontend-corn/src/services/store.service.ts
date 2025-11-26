import api from './api'
import type { IHistory, IPurchaseHistory } from '@/types'

const entity = '/store'

export const storeService = {
  getPurchaseHistory: (key: string) =>
    api
      .get<IHistory>(`${entity}/purchase-history`, {
        headers: {
          'x-key': key,
        },
      })
      .then((res) => res.data),
  buyCorn: (payload: { key: string; data: IPurchaseHistory }) =>
    api
      .post<IPurchaseHistory>(`${entity}/buy-corn`, payload.data, {
        headers: {
          'x-key': payload.key,
        },
      })
      .then((res) => res.data),
}
