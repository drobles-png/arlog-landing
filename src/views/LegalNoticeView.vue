<script setup lang="ts">
import LegalLayout from '@/components/LegalLayout.vue'
import { LEGAL, MASTERCLASS_PRICE } from '@/config/masterclass'
</script>

<template>
  <LegalLayout title="Aviso legal">
    <h2>1. Titular del sitio</h2>
    <p>
      <strong>{{ LEGAL.name }}</strong> — Razón social: {{ LEGAL.razonSocial }} · RUC:
      {{ LEGAL.ruc }} · {{ LEGAL.ciudad }} · {{ LEGAL.email }}
    </p>

    <h2>2. Sobre la masterclass</h2>
    <p>
      La masterclass es una clase en vivo de carácter formativo sobre importaciones. El acceso cuesta
      ${{ MASTERCLASS_PRICE }} y se confirma al completar el pago. El contenido es orientativo: cada
      importación depende del producto, el proveedor, la normativa vigente y los costos del momento,
      por lo que los ejemplos de la clase no garantizan resultados ni costos específicos.
    </p>

    <h2>3. Propiedad intelectual</h2>
    <p>
      Los textos, videos, marca y material de la clase pertenecen a {{ LEGAL.name }}. No se pueden
      reproducir ni distribuir sin autorización.
    </p>

    <h2>4. Responsabilidad</h2>
    <p>
      {{ LEGAL.name }} no se hace responsable por decisiones de compra o importación que tomes sin una
      asesoría específica de tu caso.
    </p>

    <h2>5. Ley aplicable</h2>
    <p>Este aviso se rige por las leyes de la República del Ecuador.</p>
  </LegalLayout>
</template>
