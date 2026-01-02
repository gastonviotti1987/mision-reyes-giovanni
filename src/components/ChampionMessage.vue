<template>
  <!-- Mensaje del campeón -->
  <div class="champion-message">
    <div class="layout">
      <!-- Imagen del campeón -->
      <div class="avatar">
        <div class="glow"></div>
        <img
          src="/campeon.jpg"
          alt="Mensaje del campeón"
          class="photo"
        />
      </div>

      <!-- Texto hablado -->
      <div class="message">
        <!-- Líneas narradas -->
        <p
          v-for="(line, index) in lines"
          :key="index"
          class="line"
          :style="{ animationDelay: `${index * 0.6}s` }"
        >
          {{ line }}
        </p>

        <!-- 🏆 BLOQUE FINAL: PREMIO -->
      <div
          class="legendary"
          :style="{ '--legendary-delay': `${lines.length * 0.6 + 0.6}s` }"
        >
          <div class="legendary-label">
            Premio legendario desbloqueado
          </div>
          <div class="legendary-main">
            🎮 Está debajo de la cama
          </div>
          <div class="legendary-sub">
            Ahí te espera tu recompensa.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lines = [
  "Hola Giovanni.",
  "Hoy corriste como un verdadero campeón.",
  "Seguiste cada pista,",
  "no te rendiste,",
  "y ganaste.",
  "",
  "Disfrutá cada juego,",
  "cada desafío,",
  "y cada victoria.",
  "",
  "Felicitaciones, campeón."
];
</script>

<style scoped>
/* =========================
   CONTENEDOR GENERAL
========================= */
.champion-message {
  margin-top: 1.5rem;
}

/* =========================
   LAYOUT IMAGEN + TEXTO
========================= */
.layout {
  display: flex;
  align-items: flex-start; /* 🔑 NO centrar vertical */
  gap: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    align-items: center;
  }
}

/* =========================
   AVATAR
========================= */
.avatar {
  position: relative;
  width: 14rem;
  height: 14rem;
  flex-shrink: 0;
}

.glow {
  position: absolute;
  inset: -0.5rem;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(56, 189, 248, 0.25),
    rgba(99, 102, 241, 0.25)
  );
  filter: blur(24px);
}

.photo {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}

/* =========================
   TEXTO NARRADO
========================= */
.message {
  max-width: 420px;
  text-align: left;
  line-height: 1.7;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.92);
}

/* Línea individual */
.line {
  opacity: 0;
  transform: translateY(6px);
  animation: speak 0.6s ease-out forwards;
}

/* Primera línea más fuerte */
.line:first-child {
  font-weight: 600;
}

/* Animación hablada */
@keyframes speak {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🏆 CONTENEDOR LEGENDARIO (ENTRADA) */
.legendary {
  margin-top: 1.6rem;
  opacity: 0;
  transform: scale(0.95);

  animation: pop 0.8s ease-out forwards;
  animation-delay: var(--legendary-delay);
}

/* 🎮 CONTENIDO LEGENDARIO (PULSO CONSTANTE) */
.legendary-inner {
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.18),
    rgba(236, 72, 153, 0.15)
  );
  border: 1px solid rgba(255, 255, 255, 0.18);
  text-align: center;

  animation: pulse 2.8s ease-in-out infinite;
}

/* Texto */
.legendary-label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

.legendary-main {
  margin-top: 0.4rem;
  font-size: 1.25rem;
  font-weight: 800;
}

.legendary-sub {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Entrada */
@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulso constante */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(251, 191, 36, 0);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 24px rgba(251, 191, 36, 0.35);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(251, 191, 36, 0);
  }
}
</style>
