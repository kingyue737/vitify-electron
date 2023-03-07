<template>
  <div>2</div>
  <teleport to="#app-bar">
    <div class="mt-5">传送一下试试</div>
  </teleport>
</template>

<script setup lang="ts">
definePage({
  meta: {
    icon: '$mdi-account',
    title: '示例页面2',
  },
})
</script>
