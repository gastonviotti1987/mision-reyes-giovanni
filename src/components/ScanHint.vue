<template>
  <div class="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
    <span class="relative flex h-3 w-3">
      <span class="animate-pingSlow absolute inline-flex h-full w-full rounded-full bg-sky-300/60"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-300"></span>
    </span>
    <div class="text-sm text-white/75">
      📷 Escaneá el código con tu tablet
    </div>
  </div>
</template>

<style scoped>
@keyframes pingSlow {
  0% { transform: scale(1); opacity: .55; }
  70% { transform: scale(1.8); opacity: 0; }
  100% { transform: scale(1.8); opacity: 0; }
}
.animate-pingSlow { animation: pingSlow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
</style>
