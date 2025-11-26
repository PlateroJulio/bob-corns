import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IHistory, IPurchaseHistory } from '@/types'
import { storeService } from '@/services/store.service'
import { useToast } from 'vue-toastification'

export const useCustomerStore = defineStore('customer', () => {
  const purchaseHistory = ref<IPurchaseHistory[]>([])
  const loadingHistory = ref<string | null>(null) // loading por cliente
  const loadingBuy = ref<Record<string, boolean>>({})
  const toast = useToast()

  const totalSuccess = computed(() =>
    purchaseHistory.value.reduce((acc, item) => acc + item.quantitySuccess, 0),
  )

  const totalFailed = computed(() =>
    purchaseHistory.value.reduce((acc, item) => acc + item.quantityFailed, 0),
  )

  const fetchPurchaseHistory = async () => {
    loadingHistory.value = 'fetch'
    try {
      const data: IHistory = await storeService.getPurchaseHistory('')
      purchaseHistory.value = data.data
    } finally {
      loadingHistory.value = null
    }
  }

  const addPurchase = (item: IPurchaseHistory) => {
    purchaseHistory.value.push(item)
  }

  const updatePurchase = (updated: IPurchaseHistory) => {
    const index = purchaseHistory.value.findIndex((p) => p.key === updated.key)
    if (index !== -1) purchaseHistory.value[index] = updated
  }

  const buyCustomerCorn = async (item: IPurchaseHistory) => {
    try {
      loadingBuy.value[item.key] = true
      await storeService.buyCorn({ key: item.key, data: item })
      toast.success(`🌽 Compra exitosa de ${item.name}!`)
    } catch (error: any) {
      if (error.response?.status === 429) {
        toast.error('⚠️ Límite de compras alcanzado. Intenta más tarde.')
      } else {
        toast.error(`❌ Error comprando a ${item.name}: ${error.message || 'Desconocido'}`)
      }
      throw error
    } finally {
      await fetchPurchaseHistory()
      loadingBuy.value[item.key] = false
    }
  }

  return {
    purchaseHistory,
    loadingBuy,
    totalSuccess,
    totalFailed,
    fetchPurchaseHistory,
    buyCustomerCorn,
    addPurchase,
    updatePurchase,
  }
})
