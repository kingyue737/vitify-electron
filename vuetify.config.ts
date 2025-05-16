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
      variant: 'filled',
      color: 'primary',
      controlVariant: 'stacked',
      VBtn: {
        rounded: 0,
      },
      precision: null,
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
      variant: 'filled',
      glow: true,
      iconColor: true,
    },
    VTextarea: {
      color: 'primary',
      variant: 'filled',
    },
    VTextField: {
      color: 'primary',
      glow: true,
      iconColor: true,
      variant: 'filled',
    },
    VAutocomplete: {
      variant: 'filled',
      color: 'primary',
      glow: true,
      iconColor: true,
    },
    VCombobox: {
      variant: 'filled',
      color: 'primary',
      glow: true,
      iconColor: true,
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
