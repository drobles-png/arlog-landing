<script setup lang="ts">
import logo from '@/assets/logos/arlog-logo.webp'
import { SOCIAL } from '@/config/masterclass'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="sfooter">
    <div class="container sfooter__inner">
      <img :src="logo" alt="Arlogs — Improving Logistics" class="sfooter__logo" width="120" height="86" />
      <div class="sfooter__social">
        <a :href="SOCIAL.instagram" target="_blank" rel="noopener" aria-label="Instagram de Arlog">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a :href="SOCIAL.facebook" target="_blank" rel="noopener" aria-label="Facebook de Arlog">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
      </div>
      <nav class="sfooter__legal">
        <RouterLink to="/politicas-privacidad">Política de privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso legal</RouterLink>
      </nav>
      <p class="sfooter__copy">© {{ year }} Arlog · Importaciones · Ecuador</p>
      <p class="sfooter__meta">
        Este sitio no forma parte de Facebook ni de Meta Platforms, Inc.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.sfooter {
  border-top: 1px solid $AR-NAVY-600;
  padding: 3rem 0 calc(3rem + env(safe-area-inset-bottom));
  background: $AR-NAVY-900;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    text-align: center;
  }

  &__logo {
    width: 120px;
    height: auto;
  }

  &__social {
    display: flex;
    gap: 0.5rem;

    a {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid $AR-NAVY-600;
      color: $AR-TEXT-MUTED;
      text-decoration: none;
      transition: color 0.15s ease, border-color 0.15s ease;

      @media (hover: hover) {
        &:hover {
          color: $white;
          border-color: $AR-BLUE-LIGHT;
        }
      }
    }
  }

  &__legal {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1.5rem;

    a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      color: $AR-TEXT-MUTED;
      font-size: 0.95rem;
    }
  }

  &__copy,
  &__meta {
    margin: 0;
    font-size: 0.85rem;
    color: $AR-TEXT-DIM;
  }
}
</style>
