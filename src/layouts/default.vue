<template>
  <AppDrawer />
  <AppBar />
  <v-main>
    <router-view />
  </v-main>
</template>

<style scoped lang="scss">
.v-main {
  padding-top: 0;
  margin-top: var(--v-layout-top);
  background-color: #f2f5f8;
}
</style>
