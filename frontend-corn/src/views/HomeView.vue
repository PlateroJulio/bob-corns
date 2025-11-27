<script setup lang="ts">
import { onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import Customers from '@/components/Customers.vue'

const customerStore = useCustomerStore()
onMounted(() => {
  customerStore.fetchCustomers()
})
</script>

<template>
  <main>
    <Customers :items="customerStore.purchaseHistory" />
  </main>
</template>
