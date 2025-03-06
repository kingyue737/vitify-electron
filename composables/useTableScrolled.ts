export function useTableScrolled(table: any) {
  const tableWrapper = ref<HTMLDivElement | null>(null)
  const { y } = useScroll(tableWrapper)
  onMounted(() => {
    tableWrapper.value = table.value.$el.querySelector('.v-table__wrapper')
  })
  watch(y, (v) => {
    if (v) {
      table.value.$el.classList.add('scrolled')
    } else {
      table.value.$el.classList.remove('scrolled')
    }
  })
}
