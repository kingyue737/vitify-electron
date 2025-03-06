<script setup lang="ts">
const drawer = useState('drawer')
</script>

<template>
  <v-footer app :order="drawer ? 0 : -1">
    <div id="app-footer" />
    <v-spacer />
    <v-defaults-provider
      :defaults="{ VBtn: { variant: 'text', size: 'x-small' } }"
    >
      <AppNotification />
      <AppSettings />
    </v-defaults-provider>
  </v-footer>
</template>
<style>
.v-footer {
  padding: 0px 10px !important;
  > .v-btn--icon,
  > #app-footer > .v-btn--icon {
    .v-icon {
      height: 1.25em;
      width: 1.25em;
    }
  }
}
</style>
