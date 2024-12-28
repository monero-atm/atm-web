<!-- NetworkWarning.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useWebSocketStore } from '@/stores/websocket'

const sessionStore = useSessionStore()
const webSocketStore = useWebSocketStore()

const warningMessage = computed(() => {
    if (!webSocketStore.isConnected) {
        return 'Connection to backend lost. Attempting to reconnect...'
    }
    if (!sessionStore.getMpayStatus()) {
        return 'MoneroPay is unreachable or in degraded health status'
    }
    return ''
})

const showModal = computed(() => {
    return !webSocketStore.isConnected || !sessionStore.getMpayStatus()
})
</script>

<template>
    <Transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
        <div 
            v-if="showModal" 
            class="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
        >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="flex min-h-full items-center justify-center p-4">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl p-12">
                    <div class="flex items-start">
                        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                            <svg 
                                class="h-6 w-6 text-red-600" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
                                />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-3xl font-semibold text-gray-900">
                                Connection Error
                            </h3>
                            <div class="mt-2">
                                <p class="text-2xl text-gray-700">
                                    {{ warningMessage }}
                                </p>
                            </div>

                            <div class="mt-6 flex justify-center">
                                <svg 
                                    class="h-8 w-8 animate-spin text-gray-500" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        class="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        stroke-width="4"
                                    />
                                    <path 
                                        class="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>