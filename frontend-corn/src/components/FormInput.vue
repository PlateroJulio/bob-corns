<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
    name: string
    label: string
    type?: string
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: ''
})

const { value, errorMessage, handleBlur } = useField(props.name)
</script>

<template>
    <div class="space-y-1 w-96">
        <label class="flex text-sm font-medium text-right text-gray-700">
            {{ props.label }}
        </label>

        <input :type="props.type" v-model="value" :placeholder="props.placeholder" @blur="handleBlur"
            class="w-full p-2 transition border-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

        <div class="h-5 overflow-hidden">
            <p v-if="errorMessage"
                class="flex items-center gap-1 text-xs text-red-600 transition-all duration-200 ease-out translate-y-0 opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {{ errorMessage }}
            </p>
        </div>
    </div>
</template>
