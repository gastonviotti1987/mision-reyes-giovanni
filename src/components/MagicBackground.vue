<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <!-- Glow superior -->
    <div
      class="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full
             bg-sky-500/12 blur-3xl"
    />

    <!-- Glow inferior -->
    <div
      class="absolute -bottom-56 -right-56 h-[680px] w-[680px] rounded-full
             bg-indigo-500/12 blur-3xl"
    />

    <!-- Halo central MUY sutil -->
    <div
      class="absolute inset-0
             bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_65%)]"
    />

    <!-- Textura suave (no grid blanca) -->
    <div
      class="absolute inset-0
             bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]
             bg-[size:32px_32px]
             opacity-30"
    />
  </div>
</template>
