<script setup lang="ts">
import { computed, onMounted } from 'vue'
import StepShell from '@/components/StepShell.vue'
import { useContactStore } from '@/stores/contact'
import { sendCapiEvent } from '@/utils/capi'
import BookingCalendar from '@/components/BookingCalendar.vue'
import { buildNota, fbq, generateEventId, trackStage } from '@/utils/ghl'
import {
  MASTERCLASS_DATE,
  MASTERCLASS_NAME,
  MASTERCLASS_PRICE,
  SOCIAL,
  masterclassDateLabel,
} from '@/config/masterclass'

// La pasarela de pago redirige aquí al terminar
const PURCHASE_KEY = 'ar_purchase_at'
const { contact } = useContactStore()

const calendarHref = computed(() => {
  if (!MASTERCLASS_DATE) return ''
  const start = new Date(MASTERCLASS_DATE)
  const end = new Date(start.getTime() + 90 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Masterclass de importación — Arlog',
    dates: `${fmt(start)}/${fmt(end)}`,
    details: 'Masterclass en vivo con Ángel, de Arlog. El enlace de acceso llega a tu correo y WhatsApp.',
  })
  return `https://calendar.google.com/calendar/render?${params}`
})

const pasos = [
  { icon: 'fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación y el enlace de la clase.' },
  { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp antes de empezar para recordarte.' },
  { icon: 'fa-box-open', text: 'Ten a mano el producto que quieres importar: lo vas a usar en el paso 3.' },
]

onMounted(() => {
  // Purchase una sola vez por dispositivo, aunque recargue la página
  try {
    if (localStorage.getItem(PURCHASE_KEY)) return
    localStorage.setItem(PURCHASE_KEY, String(Date.now()))
  } catch {
    return
  }
  const eventId = generateEventId('purchase')
  const custom = { content_name: MASTERCLASS_NAME, value: MASTERCLASS_PRICE, currency: 'USD' }
  fbq('track', 'Purchase', custom, { eventID: eventId })
  sendCapiEvent(
    'Purchase',
    eventId,
    {
      email: contact.email,
      phone: contact.telefono,
      firstName: contact.nombre,
      lastName: contact.apellido,
    },
    custom,
  )
  const nota = buildNota('PAGÓ LA MASTERCLASS', contact, {
    Total: `$${MASTERCLASS_PRICE} USD`,
    Clase: masterclassDateLabel(),
  }, eventId)
  trackStage('pagado', {
    nombre: contact.nombre,
    apellido: contact.apellido,
    email: contact.email,
    telefono: contact.telefono,
    situacion: contact.situacion,
    tags: ['masterclass-importacion', 'step-4-pagado', 'masterclass-pagado'],
    nota,
    notas: nota,
    event_id: eventId,
  })
})
</script>

<template>
  <StepShell>
    <div class="ok">
      <div class="ok__badge" aria-hidden="true"><i class="fa-solid fa-check"></i></div>
      <h1 class="ok__title">
        {{ contact.nombre ? `¡Listo, ${contact.nombre}!` : '¡Listo!' }} Tu lugar está confirmado
      </h1>
      <p class="ok__date"><i class="fa-regular fa-calendar"></i> {{ masterclassDateLabel() }}</p>

      <a v-if="calendarHref" :href="calendarHref" target="_blank" rel="noopener" class="btn btn--ghost">
        <i class="fa-regular fa-calendar-plus"></i> Agregar a mi calendario
      </a>

      <ol class="ok__steps">
        <li v-for="(p, i) in pasos" :key="i">
          <span class="ok__n">{{ i + 1 }}</span>
          <i :class="p.icon.startsWith('fa-brands') ? p.icon : `fa-solid ${p.icon}`"></i>
          <p>{{ p.text }}</p>
        </li>
      </ol>

      <p class="ok__close">
        Si al final prefieres que veamos tu caso juntos, me escribes y agendamos una reunión.
        Nos vemos en la clase. — Ángel
      </p>

      <BookingCalendar />

      <div class="ok__social">
        <a :href="SOCIAL.instagram" target="_blank" rel="noopener" class="btn btn--ghost">
          <i class="fa-brands fa-instagram"></i> Síguenos en Instagram
        </a>
      </div>
    </div>
  </StepShell>
</template>

<style scoped lang="scss">
.ok {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;

  &__badge {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: $AR-SUCCESS;
    color: $white;
    font-size: 1.8rem;
    box-shadow: 0 0 0 10px rgba($AR-SUCCESS, 0.15);
    animation: pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  &__title {
    @include heading;
    font-size: clamp(1.7rem, 5.5vw, 2.3rem);
    margin: 0;
    text-wrap: balance;
  }

  &__date {
    margin: -0.5rem 0 0;
    color: $AR-ORANGE-SOFT;
    font-weight: 600;

    i {
      margin-right: 0.35rem;
    }
  }

  &__steps {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-align: left;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
      padding: 1rem 1.1rem;
      border-radius: 12px;
      background: $AR-NAVY-800;
      border: 1px solid $AR-NAVY-600;

      > i {
        color: $AR-BLUE-LIGHT;
        margin-top: 0.3rem;
        width: 1.1rem;
      }
    }

    p {
      margin: 0;
      font-size: 0.98rem;
    }
  }

  &__n {
    flex: none;
    font-family: $font-mono;
    font-size: 0.85rem;
    padding: 0.1rem 0.45rem;
    border-radius: 5px;
    background: $AR-NAVY-600;
    margin-top: 0.15rem;
  }

  &__close {
    margin: 0.5rem 0 0;
    color: $AR-TEXT-MUTED;
  }
}

@keyframes pop {
  from {
    transform: scale(0.6);
    opacity: 0;
  }
}
</style>
