import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Situacion = 'ya_vendo' | 'quiero_empezar'

export interface ArContact {
  nombre: string
  apellido: string
  email: string
  telefono: string
  situacion: Situacion | ''
  timestamp?: number
}

const STORAGE_KEY = 'ar_contact'

const emptyContact = (): ArContact => ({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  situacion: '',
})

export const useContactStore = defineStore('contact', () => {
  const contact = ref<ArContact>(emptyContact())

  // Hidrata desde localStorage al iniciar
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) Object.assign(contact.value, JSON.parse(stored))
  } catch {
    /* ignorar */
  }

  function save(data: Partial<ArContact>) {
    Object.assign(contact.value, data, { timestamp: Date.now() })
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact.value))
    } catch {
      /* ignorar */
    }
  }

  const hasContact = () => Boolean(contact.value.email)

  return { contact, save, hasContact }
})
