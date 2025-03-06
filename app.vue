<script setup lang="ts">
const theme = useTheme()
provide(
  THEME_KEY,
  computed(() => (theme.current.value.dark ? 'dark' : undefined)),
)
const route = useRoute()
const title = computed(() => {
  return route.meta?.title || route.matched[0].meta?.title || ''
})
useHead({
  title,
  titleTemplate: (t) => (t ? `${t} | Vitify Admin` : 'Vitify Admin'),
  htmlAttrs: { lang: 'zh' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
</script>

<template>
  <v-app>
    <AppDrawer />
    <AppBar />
    <v-main>
      <NuxtPage />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
/* replace padding with margin to limit scrollbar in v-main */
.v-main {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: var(--v-layout-top);
  margin-bottom: var(--v-layout-bottom);
  height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
  overflow-y: auto;
  overflow-x: hidden;
  transition-property: padding;
  scrollbar-gutter: stable;
}
</style>
