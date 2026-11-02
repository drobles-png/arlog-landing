<script setup lang="ts">
import StepShell from '@/components/StepShell.vue'

defineProps<{ title: string }>()
</script>

<template>
  <StepShell>
    <article class="legal">
      <h1>{{ title }}</h1>
      <slot />
      <RouterLink to="/" class="legal__back"><i class="fa-solid fa-arrow-left"></i> Volver</RouterLink>
    </article>
  </StepShell>
</template>

<style scoped lang="scss">
.legal {
  color: $AR-TEXT-MUTED;
  font-size: 0.98rem;

  h1 {
    @include heading;
    font-size: 2rem;
    color: $AR-TEXT;
    margin: 0 0 1.5rem;
  }

  :deep(h2) {
    @include heading(700);
    font-size: 1.15rem;
    color: $AR-TEXT;
    margin: 2rem 0 0.5rem;
  }

  :deep(strong) {
    color: $AR-TEXT;
  }

  :deep(ul) {
    padding-left: 1.2rem;
  }

  &__back {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 2.5rem;
    min-height: 44px;
  }
}
</style>
