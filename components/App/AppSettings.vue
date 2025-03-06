<script setup lang="ts">
import { mergeProps } from 'vue'

const theme = useTheme()
const { store, state } = useColorMode({
  onChanged() {},
})
watch(
  [store, state],
  ([v]) => {
    client.toggleDark(v)
  },
  { immediate: true },
)
const primary = useLocalStorage('theme-primary', '#1697f6')
const color = computed({
  get() {
    return theme.themes.value.light.colors.primary
  },
  set(val: string) {
    primary.value = val
    theme.themes.value.light.colors.primary = val
    theme.themes.value.dark.colors.primary = val
  },
})
const colors = [
  ['#1697f6', '#ff9800'],
  ['#4CAF50', '#FF5252'],
  ['#9C27b0', '#E91E63'],
  ['#304156', '#3f51b5'],
  ['#38bdf8', '#492d22'],
]
const menuShow = ref(false)
</script>

<template>
  <v-menu
    v-model="menuShow"
    :close-on-content-click="false"
    location="top right"
    offset="15"
  >
    <template #activator="{ props: menu }">
      <v-tooltip location="top" text="主题设置">
        <template #activator="{ props: tooltip }">
          <v-btn
            icon="ph:palette"
            v-bind="mergeProps(menu, tooltip)"
            :rounded="0"
          />
        </template>
      </v-tooltip>
    </template>
    <v-card width="320">
      <v-card-text class="text-center">
        <v-label class="mb-3"> 主题设置 </v-label>
        <v-color-picker
          v-model="color"
          show-swatches
          elevation="0"
          width="288"
          mode="rgb"
          :modes="['rgb', 'hex', 'hsl']"
          :swatches="colors"
        />
        <v-btn-toggle v-model="store" mandatory class="mt-2" rounded="lg">
          <v-btn prepend-icon="ph:sun-duotone" value="light">明亮</v-btn>
          <v-btn prepend-icon="ph:moon-duotone" value="dark">暗黑</v-btn>
          <v-btn prepend-icon="ph:desktop-duotone" value="auto">跟随系统</v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
