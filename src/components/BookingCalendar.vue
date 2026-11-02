<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useContactStore } from '@/stores/contact'
import { sendCapiEvent } from '@/utils/capi'
import { getStoredFbParams, type FbParams } from '@/utils/fbclid'
import { GHL_BOOKING_CALENDAR, buildNota, fbq, generateEventId, trackStage } from '@/utils/ghl'

// Calendario de GHL de Arlog para "veamos tu caso juntos".
// Se carga solo cuando la persona lo abre: el widget pesa y la mayoría no lo necesita.
const { contact } = useContactStore()
const open = ref(false)
const booked = ref(false)
const iframeEl = ref<HTMLIFrameElement | null>(null)
const height = ref(760)
const BOOKED_KEY = 'ar_booked_at'
// id con el formato del código de inserción de GHL: form_embed.js lo usa para ajustar el alto
const FRAME_ID = 'juIoDHRJl4kJXiC7oWyB_1793643402522'
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js'

async function openCalendar() {
  open.value = true
  await nextTick()
  // Script oficial de GHL: redimensiona el iframe al elegir fecha/horario (iframe-resizer)
  if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.async = true
    document.body.appendChild(s)
  }
}

// Prellena con el registro + atribución de Meta para que la cita quede en el mismo contacto
const src = computed(() => {
  const params = new URLSearchParams()
  if (contact.nombre) params.set('first_name', contact.nombre)
  if (contact.apellido) params.set('last_name', contact.apellido)
  if (contact.email) params.set('email', contact.email)
  if (contact.telefono) params.set('phone', contact.telefono)
  const fb = getStoredFbParams()
  const keys: Array<keyof FbParams> = [
    'fbclid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
  ]
  for (const k of keys) if (fb[k]) params.set(k, fb[k])
  const qs = params.toString()
  return qs ? `${GHL_BOOKING_CALENDAR}?${qs}` : GHL_BOOKING_CALENDAR
})

function onMessage(event: MessageEvent) {
  if (!event.data || event.source !== iframeEl.value?.contentWindow) return
  const data = event.data as unknown

  // Alto dinámico que manda el widget: ['highlevel.setHeight', { height }] (formato actual)
  if (Array.isArray(data) && data[0] === 'highlevel.setHeight' && data[1]?.height) {
    height.value = Math.max(640, Number(data[1].height) + 8)
    return
  }
  // Formato anterior del widget
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    (data as { type?: string }).type === 'booking-app' &&
    (data as { height?: number }).height
  ) {
    height.value = Math.max(640, (data as { height: number }).height + 40)
    return
  }

  // Cita confirmada: ['msgsndr-booking-complete', {...}]
  if (Array.isArray(data) && data[0] === 'msgsndr-booking-complete') {
    if (booked.value) return
    booked.value = true
    try {
      localStorage.setItem(BOOKED_KEY, String(Date.now()))
    } catch {
      /* ignorar */
    }
    const eventId = generateEventId('schedule')
    const custom = { content_name: 'reunion-caso-arlog' }
    fbq('track', 'Schedule', custom, { eventID: eventId })
    sendCapiEvent(
      'Schedule',
      eventId,
      {
        email: contact.email,
        phone: contact.telefono,
        firstName: contact.nombre,
        lastName: contact.apellido,
      },
      custom,
    )
    const nota = buildNota('REUNIÓN AGENDADA', contact, { Motivo: 'Ver su caso de importación con Ángel' }, eventId)
    trackStage('reunion-agendada', {
      nombre: contact.nombre,
      apellido: contact.apellido,
      email: contact.email,
      telefono: contact.telefono,
      tags: ['masterclass-importacion', 'step-5-reunion-agendada'],
      nota,
      notas: nota,
      event_id: eventId,
    })
  }
}

onMounted(() => window.addEventListener('message', onMessage))
onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <section v-if="GHL_BOOKING_CALENDAR" class="booking" aria-labelledby="booking-title">
    <h2 id="booking-title" class="booking__title">¿Prefieres que veamos tu caso juntos?</h2>
    <p class="booking__sub">Elige el día y la hora para una reunión con Ángel.</p>

    <button
      v-if="!open"
      type="button"
      class="btn btn--ghost btn--block"
      aria-controls="booking-frame"
      :aria-expanded="open"
      @click="openCalendar"
    >
      <i class="fa-regular fa-calendar-check"></i> Agendar una reunión
    </button>

    <p v-if="booked" class="booking__ok" role="status">
      <i class="fa-solid fa-circle-check"></i> Reunión agendada. Te llega la confirmación a tu correo.
    </p>

    <div v-if="open" id="booking-frame" class="booking__frame">
      <iframe
        :id="FRAME_ID"
        ref="iframeEl"
        :src="src"
        :style="{ height: height + 'px' }"
        title="Agenda una reunión con Ángel, de Arlog"
        allow="payment"
        scrolling="no"
      ></iframe>
    </div>
  </section>
</template>

<style scoped lang="scss">
.booking {
  width: 100%;
  margin-top: 0.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid $AR-NAVY-600;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  &__title {
    @include heading;
    font-size: clamp(1.3rem, 4.5vw, 1.6rem);
    margin: 0;
    text-wrap: balance;
  }

  &__sub {
    margin: -0.4rem 0 0.25rem;
    color: $AR-TEXT-MUTED;
  }

  &__ok {
    margin: 0;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    background: rgba($AR-SUCCESS, 0.14);
    border: 1px solid rgba($AR-SUCCESS, 0.4);
    font-weight: 600;

    i {
      color: $AR-SUCCESS;
      margin-right: 0.4rem;
    }
  }

  // El widget de GHL es claro: lo enmarcamos en una tarjeta blanca para que no se vea pegado
  &__frame {
    border-radius: 14px;
    overflow: hidden;
    background: #fff;

    iframe {
      display: block;
      width: 100%;
      border: 0;
    }
  }
}
</style>
