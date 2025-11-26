<script setup lang="ts">
import type { IPurchaseHistory } from '@/types'
import { useCustomerStore } from '@/stores/customer'
import DetailPurchase from '@/components/DetailPurchase.vue'
import CreateCustomer from '@/components/CreateCustomer.vue'

defineProps<{
  items: IPurchaseHistory[]
}>()

const purchaseStore = useCustomerStore()

const handleBuy = async (item: IPurchaseHistory) => {
  await purchaseStore.buyCustomerCorn(item)
}
</script>


<template>
  <div class="flex flex-col items-center justify-center w-full mt-10 text-right">
  <h1 class="text-4xl text-blue-400 border-b-2 border-b-blue-200">Bob'Customers</h1>
  <DetailPurchase />
  <CreateCustomer/>

  <!-- Contenedor con scroll -->
  <div class="w-full max-w-full mt-6 h-[600px] overflow-y-auto">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div
        v-for="item in items"
        :key="item.key"
        class="flex items-center justify-between w-full gap-4 p-4 bg-white rounded-lg shadow-md"
      >
        <div class="flex gap-4">
          <img
            :src="item.pathImage"
            :alt="item.name"
            class="object-cover w-16 h-16 border rounded-full"
          />

          <div>
            <h3 class="text-lg font-semibold text-right">{{ item.name }}</h3>
            <div class="flex gap-x-4">
              <span class="flex items-center text-sm text-gray-600 gap-x-1">
                Éxitos: <span class="text-green-600">{{ item.quantitySuccess }}</span>
              </span>
              <span class="flex items-center text-sm text-gray-600 gap-x-1">
                Fallos: <span class="text-red-600">{{ item.quantityFailed }}</span>
              </span>
            </div>
          </div>
        </div>

        <button
          :disabled="purchaseStore.loadingBuy[item.key]"
          @click="handleBuy(item)"
          class="flex p-2 text-sm text-white bg-green-400 rounded-md hover:bg-green-500 disabled:opacity-50"
        >
          {{ purchaseStore.loadingBuy[item.key] ? 'Comprando...' : 'Comprar' }}
        </button>
      </div>
    </div>
  </div>
</div>

</template>
