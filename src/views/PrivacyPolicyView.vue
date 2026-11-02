<script setup lang="ts">
import LegalLayout from '@/components/LegalLayout.vue'
import { LEGAL } from '@/config/masterclass'
</script>

<template>
  <LegalLayout title="Política de privacidad">
    <p>
      Esta política explica cómo {{ LEGAL.name }} trata los datos personales que nos entregas en este
      sitio, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).
    </p>

    <h2>1. Responsable del tratamiento</h2>
    <p>
      <strong>Razón social:</strong> {{ LEGAL.razonSocial }}<br />
      <strong>RUC:</strong> {{ LEGAL.ruc }}<br />
      <strong>Ciudad:</strong> {{ LEGAL.ciudad }}<br />
      <strong>Correo:</strong> {{ LEGAL.email }}
    </p>

    <h2>2. Qué datos recogemos</h2>
    <ul>
      <li>Nombre, apellido, correo y número de WhatsApp que escribes en el formulario.</li>
      <li>Si ya vendes tecnología o quieres empezar, para preparar mejor la clase.</li>
      <li>
        Datos técnicos de navegación (dirección IP, navegador, parámetros de campaña) a través del
        Pixel de Meta y la API de Conversiones.
      </li>
    </ul>

    <h2>3. Para qué los usamos</h2>
    <ul>
      <li>Gestionar tu inscripción y el pago de la masterclass.</li>
      <li>Enviarte el enlace de acceso, recordatorios y el material de la clase.</li>
      <li>Responder si nos pides revisar tu caso de importación.</li>
      <li>Medir el rendimiento de nuestros anuncios.</li>
    </ul>
    <p>La base del tratamiento es tu consentimiento, que das al enviar el formulario.</p>

    <h2>4. Con quién los compartimos</h2>
    <p>
      Solo con los proveedores que necesitamos para operar: nuestro CRM, la pasarela de pago, la
      plataforma de la clase en vivo y Meta (con datos cifrados). No vendemos tus datos.
    </p>

    <h2>5. Cuánto tiempo los guardamos</h2>
    <p>
      Mientras exista una relación contigo o hasta que pidas eliminarlos, salvo que la ley exija
      conservarlos más tiempo (por ejemplo, para facturación).
    </p>

    <h2>6. Tus derechos</h2>
    <p>
      Puedes pedir acceso, rectificación, eliminación, oposición, portabilidad o suspensión del
      tratamiento escribiendo a {{ LEGAL.email }}. Respondemos en los plazos de la LOPDP.
    </p>
  </LegalLayout>
</template>
