<script setup lang="ts">
defineProps<{ modelValue?: any; messages?: string; type?: string }>()
const emit = defineEmits<{ save: [value: any] }>()
const input = useTemplateRef('input')
const confirmEdit = useTemplateRef('confirmEdit')
function focus(v: boolean) {
  if (v) setTimeout(() => input.value?.focus(), 300)
}
const menu = ref(false)
function confirm(value: any) {
  emit('save', value)
  menu.value = false
}
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    @update:model-value="focus"
  >
    <template #activator="{ props, isActive }">
      <v-sheet
        class="fill-height mx-n4 px-4 d-flex align-center"
        rounded="lg"
        style="cursor: pointer"
        :color="isActive ? 'rgb(var(--v-theme-surface-light))' : 'transparent'"
        v-bind="props"
      >
        {{ modelValue }}
      </v-sheet>
    </template>
    <v-confirm-edit
      ref="confirmEdit"
      :model-value="modelValue"
      @save="confirm($event)"
    >
      <template #default="{ model: proxyModel, actions, save, isPristine }">
        <v-card>
          <template #text>
            <v-text-field
              ref="input"
              v-model="proxyModel.value"
              :type="type"
              autofocus
              :hide-details="!messages"
              :messages="messages"
              @keydown.enter="
                () => {
                  if (!isPristine) save()
                }
              "
            />
          </template>
          <template #actions>
            <v-spacer />
            <component :is="actions" />
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-menu>
</template>
