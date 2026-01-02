<template>
  <div class="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
    <MagicBackground />
    <SoftConfetti :active="confettiOn" />

    <MissionCard>
      <!-- CONTENEDOR NARRATIVO CENTRAL -->
      <div
        class="relative w-full max-w-md mx-auto text-center space-y-6 animate-fadeIn"
      >
        <!-- Toast -->
        <div
          v-if="toast.show"
          class="rounded-2xl border px-4 py-3 text-sm transition-all duration-300"
          :class="toast.ok
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100'
            : 'bg-sky-500/10 border-sky-500/20 text-sky-100'"
        >
          <div class="font-semibold">
            {{ toast.ok ? "✨ Bien" : "💙 Tranquilo" }}
          </div>
          <div class="opacity-90">{{ toast.text }}</div>
        </div>

        <!-- STEP 0 -->
        <template v-if="step === 0">
          <div class="text-5xl animate-pulseSlow">🌟</div>

          <h1 class="text-3xl font-extrabold tracking-tight">
            Hola Giovanni
          </h1>

          <div class="rounded-3xl bg-white/5 border border-white/10 p-5 text-lg leading-relaxed">
            <p>Los Reyes Magos dejaron</p>
            <p class="font-semibold text-sky-300">una misión secreta</p>
            <p>solo para vos.</p>
          </div>

          <p class="text-white/60 text-sm">
            Si estás listo para empezar,<br />
            tocá el botón.
          </p>

          <button
            @click="startMission"
            class="w-full py-4 rounded-2xl text-lg font-bold
                   bg-gradient-to-r from-sky-400 to-indigo-400
                   hover:scale-[1.02] active:scale-[0.98] transition"
          >
            ✨ EMPEZAR ✨
          </button>

          <ProgressDots :current="1" :total="4" />
        </template>

        <!-- STEP 1 -->
        <template v-else-if="step === 1">
          <div class="text-5xl animate-bounceSoft">📺</div>

          <h2 class="text-2xl font-bold">Primera señal</h2>

          <div class="rounded-3xl bg-white/5 border border-white/10 p-5 text-lg">
            Buscá una señal cerca de donde
            <span class="font-semibold text-sky-300">
              mirás historias todos los días.
            </span>
          </div>

          <ScanHint />
          <ProgressDots :current="1" :total="4" />

          <button
            class="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition"
            @click="reset"
          >
            Reiniciar
          </button>
        </template>

        <!-- STEP 2 -->
        <template v-else-if="step === 2">
          <div class="text-5xl animate-bounceSoft">🔌</div>

          <h2 class="text-2xl font-bold">Segunda señal</h2>

          <div class="rounded-3xl bg-white/5 border border-white/10 p-5 text-lg">
            No todos los tesoros se ven.<br />
            <span class="font-semibold text-sky-300">
              Algunos esperan ser encendidos.
            </span>
          </div>

          <ScanHint />
          <ProgressDots :current="2" :total="4" />

          <button
            class="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition"
            @click="reset"
          >
            Reiniciar
          </button>
        </template>

        <!-- STEP 3 -->
        <template v-else-if="step === 3">
          <div class="text-5xl animate-bounceSoft">🛏️</div>

          <h2 class="text-2xl font-bold">Última señal</h2>

          <div class="rounded-3xl bg-white/5 border border-white/10 p-5 text-lg">
            El tesoro más importante<br />
            <span class="font-semibold text-sky-300">
              nunca se deja a la vista.
            </span>
          </div>

          <ScanHint />
          <ProgressDots :current="3" :total="4" />

          <button
            class="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition"
            @click="reset"
          >
            Reiniciar
          </button>
        </template>

        <!-- STEP 4 -->
        <template v-else>
          <div class="text-5xl animate-pulseSlow">🎉</div>

          <h2 class="text-3xl font-extrabold">
            ¡Tesoro encontrado!
          </h2>

          <p class="text-white/80 text-lg">
            Los Reyes Magos dejaron un mensaje especial para vos.
          </p>

          <ChampionMessage />

          <ProgressDots :current="4" :total="4" />

          <p class="text-xs text-white/45">
            “Algunos tesoros se encuentran… otros se merecen.”
          </p>
        </template>
      </div>
    </MissionCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import MagicBackground from "../components/MagicBackground.vue";
import MissionCard from "../components/MissionCard.vue";
import ProgressDots from "../components/ProgressDots.vue";
import SoftConfetti from "../components/SoftConfetti.vue";
import ScanHint from "../components/ScanHint.vue";
import ChampionMessage from "../components/ChampionMessage.vue";
import { useReyesMission } from "../composables/useReyesMission";

const route = useRoute();
const router = useRouter();
const { step, toast, load, start, reset, handleQr } = useReyesMission();
const confettiOn = ref(false);

function startMission() {
  start();
}

onMounted(() => {
  load();
  const code = route.query.code as string | undefined;
  if (code) {
    handleQr(code);
    router.replace({ query: {} });
  }
  confettiOn.value = step.value === 4;
});

watch(step, (v) => {
  confettiOn.value = v === 4;
});
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out both;
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}
.animate-pulseSlow {
  animation: pulseSlow 2.5s ease-in-out infinite;
}

@keyframes bounceSoft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-bounceSoft {
  animation: bounceSoft 1.8s ease-in-out infinite;
}
</style>
