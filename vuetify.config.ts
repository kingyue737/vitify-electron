import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { md3 } from 'vuetify/blueprints'

export default defineVuetifyConfiguration({
  blueprint: md3,
  locale: {
    locale: 'zhHans',
    fallback: 'en',
  },
  icons: false,
  localeMessages: ['zhHans', 'en'],
  defaults: {
    VSwitch: {
      color: 'primary',
      inset: true,
    },
    VDataTable: {
      fixedHeader: true,
      hover: true,
    },
    VNumberInput: {
      color: 'primary',
      controlVariant: 'stacked',
      VBtn: {
        rounded: 0,
      },
    },
    VCard: {
      flat: true,
      border: true,
    },
    VBtn: { color: '' },
    VNavigationDrawer: {
      VList: {
        nav: true,
        VListItem: {
          rounded: 'xl',
        },
      },
    },
    VChip: { rounded: 'lg' },
    VSelect: {
      color: 'primary',
    },
    VTextarea: {
      color: 'primary',
    },
    VTextField: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
    },
    VCheckboxBtn: {
      color: 'primary',
    },
    VProgressLinear: {
      color: 'primary',
    },
    VTooltip: {
      openDelay: 500,
      location: 'top',
    },
    VConfirmEdit: {
      okText: '确认',
      cancelText: '取消',
    },
  },
  display: {
    mobileBreakpoint: 'sm',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { colors: {} },
      dark: { colors: {} },
    },
  },
})
