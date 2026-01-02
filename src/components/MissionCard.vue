<template>
  <div class="w-full max-w-md">
    <div
      class="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-[0_18px_60px_rgba(0,0,0,.45)] animate-cardIn"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes cardIn {
  from { opacity: 0; transform: translateY(10px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-cardIn { animation: cardIn .55s ease-out both; }
</style>
