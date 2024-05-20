<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useExchangeRateStore } from './stores/exchangeRate';

const exchangeRateStore = useExchangeRateStore();
exchangeRateStore.startRefetching();

const router = useRouter();

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.preventDefault();
};

const handlePopState = () => {
  router.replace('/');
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('popstate', handlePopState);

  const [navigationEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (navigationEntry && navigationEntry.type === 'reload') {
    router.replace('/');
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  window.removeEventListener('popstate', handlePopState);
});
</script>
<template>
  <RouterView />
</template>
