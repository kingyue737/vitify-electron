<script setup lang="ts">
const dialog = ref(false)
const confirmed = ref(false)
let resolve: (value: boolean) => void
const message = ref('')
watch(dialog, (v) => {
  if (!v) {
    resolve(confirmed.value)
  }
})
function open(text: string) {
  confirmed.value = false
  dialog.value = true
  message.value = text
  return new Promise<boolean>((resolveFn) => {
    resolve = resolveFn
  })
}
function confirm() {
  confirmed.value = true
  dialog.value = false
}
function cancel() {
  confirmed.value = false
  dialog.value = false
}
defineExpose({ open })
</script>

<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card style="z-index: -1">
      <v-card-text class="font-weight-bold d-flex">
        <v-icon class="mr-2" color="warning" icon="ph:warning-circle-fill" />
        <v-spacer />
        <span>{{ message }}</span>
        <v-spacer />
        <div>&nbsp;</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="confirm"> 确认 </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
