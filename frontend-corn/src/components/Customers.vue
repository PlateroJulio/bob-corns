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
    <div class="grid w-full max-w-full grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
      <CreateCustomer />
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 h-[600px] overflow-y-auto">
        <div v-for="item in items" :key="item.key"
          class="flex items-center justify-between w-full gap-4 p-4 bg-white rounded-lg shadow-md">
          <div class="flex gap-4">
            <img :src="item.pathImage" :alt="item.name" class="object-cover w-16 h-16 border rounded-full" />

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


          <button @click="handleBuy(item)"
            class="flex items-center justify-center w-20 p-2 text-sm text-white bg-green-400 rounded-md hover:bg-green-500 disabled:opacity-50"
            :disabled="purchaseStore.loadingBuy[item.key]">
            <span v-if="purchaseStore.loadingBuy[item.key]" class="flex items-center justify-center">
              <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </span>

            <span v-else>Comprar</span>
          </button>


        </div>
      </div>
    </div>
  </div>

</template>
