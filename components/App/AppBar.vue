<script setup lang="ts">
const theme = useTheme()
const drawer = useState('drawer')
const route = useRoute()
const breadcrumbs = computed(() => {
  return route!.matched
    .filter(
      (item) =>
        item.meta && item.meta.title && !(item.meta?.breadcrumb === 'hidden'),
    )
    .map((r, i, array) => ({
      title: r.meta.title!,
      disabled: r.path === route.path || i === array.length - 1 || false,
      to: r.path,
    }))
})
const isDark = useDark({
  onChanged(dark: boolean, _, mode) {
    theme.global.name.value = mode
  },
})
const toggleDark = useToggle<true, false | null>(isDark)
function back() {
  window.history.back()
}
function refresh() {
  window.location.reload()
}
const dev = import.meta.env.DEV
const router = useRouter()
const canGoBack = ref(false)
router.afterEach(() => {
  // @ts-expect-error Experimental https://developer.mozilla.org/en-US/docs/Web/API/Navigation
  canGoBack.value = window.navigation.canGoBack
})
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const overlayMargin = computed(() =>
  isFullscreen.value ? '0' : 'calc(100vw - env(titlebar-area-width, 0))',
)
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon
      v-tooltip="{ text: `${drawer ? '收起' : '展开'}导航栏` }"
      @click="drawer = !drawer"
    />
    <div class="d-none d-sm-flex align-center">
      <v-btn
        v-tooltip="{ text: '返回' }"
        :disabled="!canGoBack"
        icon="ph:arrow-left"
        @click="back()"
      />
      <v-btn v-if="dev" icon="ph:arrow-clockwise" @click="refresh()" />
      <v-breadcrumbs :items="breadcrumbs">
        <template #divider>
          <v-icon icon="ph:caret-right" />
        </template>
      </v-breadcrumbs>
    </div>
    <div id="app-bar" />
    <v-spacer />
    <div
      class="align-self-start"
      :style="`right: ${overlayMargin}; position: fixed`"
    >
      <v-defaults-provider
        :defaults="{ VBtn: { rounded: 0, class: 'px-5', size: 'x-small' } }"
      >
        <v-btn
          v-tooltip="`切换到${isDark ? '明亮' : '暗黑'}模式`"
          style="height: 31px; padding-top: 1px"
          :icon="isDark ? 'ph:moon' : 'ph:sun'"
          @click="toggleDark()"
        />
        <v-btn
          v-tooltip="`${isFullscreen ? '退出' : ''}全屏`"
          style="height: 31px; padding-top: 1px"
          :icon="isFullscreen ? 'ph:corners-in' : 'ph:corners-out'"
          @click="toggleFullscreen()"
        />
      </v-defaults-provider>
    </div>
  </v-app-bar>
</template>
