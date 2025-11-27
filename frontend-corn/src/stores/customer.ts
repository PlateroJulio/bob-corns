import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICreateCustomer, IHistory, IPurchaseHistory } from '@/types'
import { storeService } from '@/services/store.service'
import { customerService } from '@/services/customer.service'

import { useToast } from 'vue-toastification'
import { minDelay, sleepFunc } from '@/utils'

export const useCustomerStore = defineStore('customer', () => {
  const purchaseHistory = ref<IPurchaseHistory[]>([])
  const loadingHistory = ref<string | null>(null)
  const loadingBuy = ref<Record<string, boolean>>({})
  const toast = useToast()

  const totalSuccess = computed(() =>
    purchaseHistory.value.reduce((acc, item) => acc + item.quantitySuccess, 0),
  )

  const totalFailed = computed(() =>
    purchaseHistory.value.reduce((acc, item) => acc + item.quantityFailed, 0),
  )

  const fetchCustomers = async () => {
    loadingHistory.value = 'fetch'
    try {
      const data: IHistory = await customerService.getCustomers()
      purchaseHistory.value = data.data
      loadingBuy.value = Object.fromEntries(purchaseHistory.value.map((item) => [item.key, false]))
    } finally {
      loadingHistory.value = null
    }
  }

  const buyCustomerCorn = async (item: IPurchaseHistory) => {
    try {
      loadingBuy.value[item.key] = true
      await minDelay(
      storeService.buyCorn({ key: item.key, data: item }),
      600 
    )
      toast.success(`🌽 Compra exitosa de ${item.name}!`)
    } catch (error: any) {
      if (error.response?.status === 429) {
        toast.error('⚠️ Límite de compras alcanzado. Intenta más tarde.')
        await sleepFunc(500)
      } else {
        toast.error(`❌ Error comprando a ${item.name}: ${error.message || 'Desconocido'}`)
      }
      throw error
    } finally {
      await fetchCustomers()
      loadingBuy.value[item.key] = false
    }
  }

  const createCustomer = async (item: ICreateCustomer) => {
    try {
      await customerService.create(item)
      toast.success(`Comprador ${item.name} creado!`)
    } catch (error: any) {
      toast.error(
        `❌ Error al intentar crear comprador ${item.name}: ${error.message || 'Desconocido'}`,
      )
    } finally {
      await fetchCustomers()
    }
  }

  return {
    purchaseHistory,
    loadingBuy,
    totalSuccess,
    totalFailed,
    fetchCustomers,
    buyCustomerCorn,
    createCustomer,
  }
})
