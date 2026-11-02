---
target: landing Arlog producción (mobile)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\cjura\\bakano\\clientes-landing\\clientes\\arlog\\arlog-landing\\src\\views\\FunnelView.vue"
target_fingerprint: "sha256:a5018b33daab39ccccfcc0219cb404791e608c57f5d20747bdce5ff621f0b29b"
target_path: "C:\\Users\\cjura\\bakano\\clientes-landing\\clientes\\arlog\\arlog-landing\\src\\views\\FunnelView.vue"
timestamp: 2026-11-02T22-48-27Z
slug: src-views-funnelview-vue
---
Method: dual-agent (A: design review · B: detector + browser), producción https://arlogs-landing.vercel.app, foco mobile.

## Design Health Score — 24/32 (n/a: 7, 10)
| # | Heurística | Nota | Problema |
|---|---|---|---|
| 1 | Estado del sistema | 3 | "Tu lugar está confirmado" sobre "Fecha por confirmar" |
| 2 | Mundo real | 3 | Widget de agenda en inglés y llamado "Asesoría Premium" |
| 3 | Control y libertad | 3 | El modal no atrapa el foco (Tab se va a Wistia) |
| 4 | Consistencia | 3 | 4 textos de CTA distintos; iframe blanco; topbar naranja no clicable |
| 5 | Prevención de errores | 3 | Bien la validación de teléfono; selector de ~240 países |
| 6 | Reconocer vs recordar | 3 | No dice plataforma ni duración de la clase |
| 7 | Flexibilidad | n/a | landing |
| 8 | Estética | 3 | Confirmación repite "veamos tu caso juntos" dos veces |
| 9 | Recuperación de errores | 3 | Correo vacío dice "Revisa tu correo" |
| 10 | Ayuda | n/a | landing |

## Especificidad
Hecha para Arlog en los detalles (ticket $1,500→$2,157 con ruta aéreo/marítimo/terrestre, colores del logo en los 3 pasos, Plex Mono para cifras, voz de Ángel). Genérica en "Quién da la clase" (logo en vez de Ángel) y en la estructura estándar de embudo VSL. Detector CLI: 0. Detector en navegador: brillos radiales, halo del CTA, eyebrows (estilo de marca, no defectos) y 1 real: placeholder de WhatsApp a 4.2:1.

## Priority issues
- [P0] /pago sin forma de pagar (PAYMENT_URL y WHATSAPP_NUMBER vacíos → Instagram). /impeccable harden
- [P1] Confirmación se contradice y widget de agenda en inglés/"Asesoría Premium"; párrafo duplicado; paso 3 no viene del VSL. /impeccable clarify
- [P1] Sin prueba de confianza antes de pagar: no hay cara de Ángel, ni plataforma/duración. /impeccable layout
- [P2] Modal: sin trampa de foco, radios sin position:relative, placeholder 4.2:1, mensaje de correo vacío. /impeccable harden
- [P3] CTA con 4 textos, CTA bajo el pliegue en desktop, negrita falsa en "$10" mono, play de Wistia azul, favicon/og de 524KB y og relativa, Font Awesome completo. /impeccable polish

## Personas
Android barato desde anuncio: topbar parece botón; CTA asoma en 705/740; termina en Instagram. Escéptico: no ve a Ángel; "Fecha por confirmar" 6 veces. Teclado/lector: foco escapa del modal; íconos sin aria-hidden; iframe en inglés.

## Minor
Píldora "+$657" con relleno de acción parece botón; teléfono E.164 crudo en /pago; 3 pasos repiten las dudas; mucho aire en desktop; dudas__note a 12.75px.

## Questions
¿Usar un fotograma del VSL como cara de Ángel? ¿La reunión es el producto real? ¿Se lanza sin fecha?
