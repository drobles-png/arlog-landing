// Datos de la masterclass de Arlog. Todo lo que cambie entre ediciones vive aquí.

// Fecha y hora de inicio en hora de Ecuador (ISO con -05:00). Vacío = "Fecha por confirmar".
export const MASTERCLASS_DATE = ''

export const MASTERCLASS_PRICE = 10
export const MASTERCLASS_CURRENCY = 'USD'
export const MASTERCLASS_NAME = 'Masterclass: Importa tu tecnología desde China'

// Enlace de pago (Payphone, link de cobro, etc.). Vacío = /pago muestra el aviso
// "te enviamos el enlace por WhatsApp" y no se rompe el flujo.
// La pasarela debe redirigir al terminar a https://<dominio>/inscripcion-confirmada
export const PAYMENT_URL = ''

// VSL de Ángel en Wistia
export const WISTIA_MEDIA_ID = 'hnck8wn24b'

// WhatsApp de Arlog en formato internacional sin "+" (ej. 593987654321). Vacío = se oculta.
export const WHATSAPP_NUMBER = ''

export const SOCIAL = {
  instagram: 'https://www.instagram.com/arlogsecuador/',
  facebook: 'https://www.facebook.com/Arlogsecuador/',
}

// Entidad legal para políticas — PENDIENTE confirmar razón social y RUC
export const LEGAL = {
  name: 'Arlog',
  razonSocial: 'Por confirmar',
  ruc: 'Por confirmar',
  ciudad: 'Guayaquil, Ecuador',
  email: 'Por confirmar',
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'America/Guayaquil',
}

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Guayaquil',
}

export function masterclassDateLabel(): string {
  if (!MASTERCLASS_DATE) return 'Fecha por confirmar'
  const d = new Date(MASTERCLASS_DATE)
  const date = d.toLocaleDateString('es-EC', DATE_FORMAT)
  const time = d.toLocaleTimeString('es-EC', TIME_FORMAT)
  return `${date.charAt(0).toUpperCase()}${date.slice(1)} · ${time} (hora Ecuador)`
}

// Versión corta para espacios estrechos (barra fija en móvil): "Mié 12 nov · 19:00"
export function masterclassDateShort(): string {
  if (!MASTERCLASS_DATE) return 'Fecha por confirmar'
  const d = new Date(MASTERCLASS_DATE)
  const date = d.toLocaleDateString('es-EC', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'America/Guayaquil',
  })
  const time = d.toLocaleTimeString('es-EC', TIME_FORMAT)
  return `${date.charAt(0).toUpperCase()}${date.slice(1).replace(/\./g, '')} · ${time}`
}

export function whatsappLink(text: string): string {
  if (!WHATSAPP_NUMBER) return ''
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
