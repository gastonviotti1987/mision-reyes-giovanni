<template>
  <div v-if="active" class="confetti" aria-hidden="true">
    <span
      v-for="n in pieces"
      :key="n"
      class="piece"
      :style="pieceStyle()"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  active: boolean;
  pieces?: number;
}>();

const pieces = props.pieces ?? 90;

/**
 * Estilos por pieza (no sincronizado) => caída constante
 * TS-safe: CSS vars como string.
 */
function pieceStyle(): Record<string, string> {
  const x = Math.random();
  const r = Math.random();
  const h = Math.random();
  const delay = Math.random() * 4;          // 0..4s (entrada desfasada)
  const duration = 3.5 + Math.random() * 3; // 3.5..6.5s (velocidad variable)

  return {
    "--x": x.toString(),
    "--r": r.toString(),
    "--h": h.toString(),
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
}
</script>

<style scoped>
.confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 60;
  overflow: hidden;
}

/* pieza */
.piece {
  position: absolute;
  top: -14px;
  left: calc(100% * var(--x));
  width: 7px;
  height: 12px;
  border-radius: 3px;
  opacity: 0.9;

  background: hsl(calc(360 * var(--h)), 90%, 65%);

  animation-name: fall, drift;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;

  transform: rotate(calc(360deg * var(--r)));
  filter: drop-shadow(0 10px 14px rgba(0,0,0,.25));
}

/* caída */
@keyframes fall {
  0% { transform: translateY(-14px) rotate(0deg); }
  100% { transform: translateY(110vh) rotate(480deg); }
}

/* drift suave */
@keyframes drift {
  0% { margin-left: 0; }
  50% { margin-left: 14px; }
  100% { margin-left: 0; }
}
</style>
