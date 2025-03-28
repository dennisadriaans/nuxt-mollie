<template>
  <div>
    <div>basic</div>
    <div id="mollie-module-test">
      {{ mollieAvailable ? 'Mollie module loaded successfully' : 'Mollie module not loaded' }}
    </div>
  </div>
</template>

<script setup>
const mollieAvailable = typeof useMollie === 'function'
</script>
