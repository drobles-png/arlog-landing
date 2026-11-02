<script setup lang="ts">
import logo from '@/assets/logos/arlog-logo.webp'

defineProps<{ step?: string }>()
</script>

<template>
  <div class="shell">
    <div class="shell__glow" aria-hidden="true"></div>
    <header class="shell__head">
      <RouterLink to="/" aria-label="Volver al inicio">
        <img :src="logo" alt="Arlogs — Improving Logistics" width="96" height="69" />
      </RouterLink>
      <p v-if="step" class="shell__step">{{ step }}</p>
    </header>
    <main class="shell__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.shell {
  position: relative;
  min-height: 100dvh;
  padding: 1.5rem 1rem calc(3rem + env(safe-area-inset-bottom));

  &__glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60% 35% at 20% 0%, rgba($AR-BLUE, 0.3), transparent 70%),
      radial-gradient(50% 30% at 90% 5%, rgba($AR-INDIGO, 0.45), transparent 70%);
    pointer-events: none;
  }

  &__head {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    img {
      width: 96px;
      height: auto;
    }
  }

  &__step {
    @include eyebrow;
    margin: 0;
    color: $AR-BLUE-LIGHT;
  }

  &__main {
    position: relative;
    max-width: 560px;
    margin: 0 auto;
  }
}
</style>
