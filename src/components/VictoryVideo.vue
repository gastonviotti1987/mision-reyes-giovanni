<template>
  <div class="relative w-full mt-6">
    <div class="absolute -inset-2 rounded-3xl bg-gradient-to-r from-sky-400/20 to-indigo-400/20 blur-2xl"></div>

    <video
      ref="videoRef"
      class="relative w-full rounded-2xl shadow-xl border border-white/10"
      :src="src"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="$emit('ended')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

defineEmits<{
  (e: "ended"): void;
}>();

const props = defineProps<{
  src?: string;
}>();

const src = props.src ?? "/video/mensaje-campeon.mp4";
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  // iOS/Android suelen permitir autoplay si está muted + playsinline
  videoRef.value?.play().catch(() => {
    // si el dispositivo bloquea, el video queda listo para play con primer toque
  });
});
</script>
