<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{ mediaId: string }>()

// Los scripts de Wistia se inyectan una sola vez, al montar el reproductor
const loadScript = (src: string, module = false) => {
  if (document.querySelector(`script[src="${src}"]`)) return
  const s = document.createElement('script')
  s.src = src
  s.async = true
  if (module) s.type = 'module'
  document.head.appendChild(s)
}

onMounted(() => {
  loadScript('https://fast.wistia.com/player.js')
  loadScript(`https://fast.wistia.com/embed/${props.mediaId}.js`, true)
})
</script>

<template>
  <div class="wvideo" :style="{ '--swatch': `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)` }">
    <wistia-player :media-id="mediaId" aspect="1.7777777777777777"></wistia-player>
  </div>
</template>

<style scoped lang="scss">
.wvideo {
  position: relative;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: $AR-NAVY-700;
  border: 1px solid $AR-NAVY-600;
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);

  :deep(wistia-player:not(:defined)) {
    display: block;
    padding-top: 56.25%;
    background: center / contain no-repeat var(--swatch);
    filter: blur(5px);
  }
}
</style>
