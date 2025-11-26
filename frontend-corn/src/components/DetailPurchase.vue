<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
const purchaseStore = useCustomerStore()

</script>


<template>
    <div class="flex flex-col items-center justify-center w-full pb-4 mt-10 space-y-4 text-right rounded-md shadow-lg">
        <h1 class="text-xl text-slate-400">Totales</h1>

        <div class="flex gap-x-4">
            <span class="flex items-center text-sm text-gray-600 gap-x-1">
                Compras exitosas: <span class="text-green-600">{{ purchaseStore.totalSuccess }}</span>
            </span>
            <span class="flex items-center text-sm text-gray-600 gap-x-1">
                Compras fallidas: <span class="text-red-600">{{ purchaseStore.totalFailed }}</span>
            </span>
        </div>

    </div>
</template>
