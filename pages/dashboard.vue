<script setup lang="ts">
definePageMeta({
  icon: 'ph:gauge-duotone',
  title: 'Dashboard',
  drawerIndex: 1,
})
const stats = ref([
  {
    icon: 'ph:globe-duotone',
    title: 'Bandwidth',
    value: 23,
    unit: 'GB',
    color: 'primary',
    caption: 'Up: 13, Down: 10',
  },
  {
    icon: 'ph:rss-duotone',
    title: 'Submissions',
    value: 108,
    color: 'primary',
    caption: 'Too young, too naive',
  },
  {
    icon: 'ph:paper-plane-duotone',
    title: 'Requests',
    value: 1238,
    color: 'warning',
    caption: 'Limit: 1320',
  },
  {
    icon: 'ph:bell-duotone',
    title: 'Messages',
    value: 9042,
    color: 'primary',
    caption: 'Warnings: 300, erros: 47',
  },
  {
    icon: 'ph:github-logo-duotone',
    title: 'Github Stars',
    value: NaN,
    color: 'grey',
    caption: 'API has no response',
  },
  {
    icon: 'ph:money-duotone',
    title: 'Total Fee',
    value: 2300,
    unit: '￥',
    color: 'error',
    caption: 'Upper Limit: 2000 ￥',
  },
])
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <StatsCard
          :title="stat.title"
          :unit="stat.unit"
          :color="stat.color"
          :icon="stat.icon"
          :value="stat.value"
        >
          <template #footer>
            {{ stat.caption }}
          </template>
        </StatsCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="12">
        <v-card class="pa-2">
          <ChartLine />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-2">
          <ChartRadar />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-2">
          <ChartPie />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-2">
          <ChartBar />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card:not(.stats-card) {
  height: 340px;
}
</style>
