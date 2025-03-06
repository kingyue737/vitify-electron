import type { IconProps, IconAliases } from 'vuetify'
import { Icon } from '#components'
import type { VDataTable } from 'vuetify/components'
import { useStorage } from '@vueuse/core'

const aliases: IconAliases = {
  collapse: 'ph:caret-up-bold',
  complete: 'ph:check',
  cancel: 'ph:x-circle-fill',
  close: 'ph:x',
  clear: 'ph:x-circle-fill',
  delete: 'ph:x-circle-fill',
  success: 'ph:check-circle-fill',
  info: 'ph:info-fill',
  warning: 'ph:warning-circle-fill',
  error: 'ph:x-circle-fill',
  prev: 'ph:caret-left-bold',
  next: 'ph:caret-right-bold',
  checkboxOn: 'ph:check-square-fill',
  checkboxOff: 'ph:square',
  checkboxIndeterminate: 'ph:minus-square-fill',
  delimiter: 'ph:circle-fill',
  sortAsc: 'ph:arrow-up',
  sortDesc: 'ph:arrow-down',
  expand: 'ph:caret-down-bold',
  menu: 'ph:list',
  subgroup: 'ph:caret-down-fill',
  dropdown: 'ph:caret-down-fill',
  radioOn: 'ph:radio-button-fill',
  radioOff: 'ph:circle',
  edit: 'ph:pen',
  ratingEmpty: 'ph:star',
  ratingFull: 'ph:star-fill',
  ratingHalf: 'ph:star-half-fill',
  loading: 'ph:arrows-clockwise',
  first: 'ph:caret-line-left-bold',
  last: 'ph:caret-line-right-bold',
  unfold: 'ph:caret-up-down',
  file: 'ph:paperclip',
  plus: 'ph:plus',
  minus: 'ph:minus',
  calendar: 'ph:calendar-dots',
  treeviewCollapse: 'ph:caret-down-fill',
  treeviewExpand: 'ph-caret-right-fill',
  eyeDropper: 'ph:eyedropper',
}

export type DataTableHeaders = VDataTable['$props']['headers']

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:configuration', ({ vuetifyOptions }) => {
    vuetifyOptions.icons = {
      defaultSet: 'nuxtIcon',
      sets: {
        nuxtIcon: {
          component: ({ icon, tag, ...rest }: IconProps) =>
            h(tag, rest, [
              h(Icon, { name: (aliases[icon as string] as string) ?? icon }),
            ]),
        },
      },
      aliases,
    }
    const primary = useStorage('theme-primary', '#1697f6').value
    vuetifyOptions.theme = {
      themes: {
        light: { colors: { primary } },
        dark: { colors: { primary } },
      },
    }
  })
})
