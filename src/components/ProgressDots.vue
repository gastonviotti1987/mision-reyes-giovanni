<template>
  <div class="flex items-center justify-center gap-2 mt-6" aria-label="Progreso">
    <span v-for="i in total" :key="i"
      class="h-2.5 w-2.5 rounded-full transition-all duration-300"
      :class="dotClass(i)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number; // step actual
  total: number;   // total steps visibles (sin contar 0)
}>();

function dotClass(i: number) {
  // current: 1..4
  if (i < props.current) return "bg-emerald-400/80";
  if (i === props.current) return "bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.35)] scale-110";
  return "bg-white/20";
}
</script>
