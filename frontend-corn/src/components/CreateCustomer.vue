<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { CustomerSchema } from '@/schemas/customer.schema'
import FormInput from '@/components/FormInput.vue'

const validationSchema = toTypedSchema(CustomerSchema.create)

const { handleSubmit } = useForm({ validationSchema })

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="max-w-md p-4 mx-auto space-y-4">
    <FormInput name="name" label="Nombre" />

    <FormInput
      name="quantitySuccess"
      label="Éxitos"
      type="number"
    />

    <FormInput
      name="quantityFailed"
      label="Fallidos"
      type="number"
    />

    <button
      type="submit"
      class="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Guardar
    </button>
  </form>
</template>
