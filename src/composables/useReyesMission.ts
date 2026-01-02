import { ref } from "vue";

export type MissionStep = 0 | 1 | 2 | 3 | 4;
// 0: bienvenida
// 1: pista 1 (TV)
// 2: pista 2 (ENCENDER)
// 3: pista 3 (CAMA - QR final)
// 4: REVELACIÓN (PS5)

const STORAGE_KEY = "mision-reyes-giovanni-v1";

export type QrCode = "TV01" | "POWER02" | "FINAL99";

/**
 * Mapa: qué QR completa qué paso.
 * El paso "espera QR" y cuando llega el QR correcto, avanza al siguiente.
 */
const QR_EXPECTED_BY_STEP: Record<number, QrCode> = {
  1: "TV01",
  2: "POWER02",
  3: "FINAL99",
};

export function useReyesMission() {
  const step = ref<MissionStep>(0);

  // mensaje suave para feedback
  const toast = ref<{ show: boolean; ok: boolean; text: string }>({
    show: false,
    ok: true,
    text: "",
  });

  function load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const n = Number(saved);
      if ([0, 1, 2, 3, 4].includes(n)) step.value = n as MissionStep;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, String(step.value));
  }

  function reset() {
    step.value = 0;
    localStorage.removeItem(STORAGE_KEY);
    toast.value = { show: false, ok: true, text: "" };
  }

  function start() {
    if (step.value === 0) {
      step.value = 1;
      save();
    }
  }

  function advance() {
    if (step.value < 4) {
      step.value = (step.value + 1) as MissionStep;
      save();
    }
  }

  function setToast(ok: boolean, text: string) {
    toast.value = { show: true, ok, text };
    // auto-hide
    window.setTimeout(() => {
      toast.value.show = false;
    }, 2200);
  }

  /**
   * Procesa QR: si coincide con el esperado para el paso actual, avanza.
   * Si no coincide, muestra un mensaje suave (sin error).
   */
  function handleQr(code?: string): boolean {
    if (!code) return false;

    const normalized = String(code).trim().toUpperCase();
    const expected = QR_EXPECTED_BY_STEP[step.value];

    if (!expected) {
      // No estamos en una pantalla que espere QR (ej: bienvenida o revelación).
      setToast(true, "Ya estás avanzando… ✨");
      return false;
    }

    if (normalized === expected) {
      // éxito
      gentleVibrate(true);
      setToast(true, "¡Muy bien Giovanni! ✨");
      advance();
      return true;
    }

    // QR equivocado → mensaje amable
    gentleVibrate(false);
    setToast(false, "Este todavía no es… sigamos buscando 💙");
    return false;
  }

  function gentleVibrate(success: boolean) {
    try {
      // vibración suave para tablet
      if (navigator.vibrate) {
        navigator.vibrate(success ? [25, 40, 25] : [80]);
      }
    } catch {}
  }

  return {
    step,
    toast,
    load,
    save,
    reset,
    start,
    advance,
    handleQr,
  };
}
