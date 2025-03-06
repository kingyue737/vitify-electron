<script setup lang="ts">
import type { DataTableHeaders } from '~/plugins/vuetify'

definePageMeta({
  icon: 'ph:users-duotone',
  title: 'Users',
  drawerIndex: 4,
})

const headers: DataTableHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Title', key: 'title' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Actions', key: 'actions' },
]

const items = ref(await client.getPeople())

const search = ref('')
const dialogDelete = useTemplateRef('dialogDelete')
const table = useTemplateRef('dataTable')
useTableScrolled(table)

function showDialogDelete(id: number) {
  dialogDelete.value
    ?.open('Are you sure you want to delete this user?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const { id: _id } = await client.deletePerson(id)
          const index = items.value.findIndex((v) => v.id === _id)
          if (index !== -1) items.value.splice(index, 1)
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <client-only>
            <teleport to="#app-bar" defer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="ph:magnifying-glass-duotone"
                label="Search"
                single-line
                hide-details
                density="compact"
                class="mr-2 d-none d-sm-block"
                rounded="xl"
                flat
                variant="solo"
                style="width: 250px"
              />
            </teleport>
          </client-only>
          <v-data-table
            ref="dataTable"
            :items="items || undefined"
            :headers="headers"
            show-select
            :search="search"
          >
            <template #item.role="{ item }">
              <v-chip>{{ item.role }}</v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-defaults-provider
                :defaults="{
                  VBtn: {
                    size: 20,
                    rounded: 'lg',
                    variant: 'text',
                    class: 'ml-1',
                    color: '',
                  },
                  VIcon: {
                    size: 20,
                  },
                  VTooltip: {
                    location: 'top',
                  },
                }"
              >
                <v-btn v-tooltip="{ text: 'Edit' }" icon="ph:pen-duotone" />
                <v-btn v-tooltip="{ text: 'Copy' }" icon="ph:copy-duotone" />
                <v-btn
                  v-tooltip="{ text: 'Delete' }"
                  icon="ph:trash-duotone"
                  @click.stop="showDialogDelete(item.id)"
                />
              </v-defaults-provider>
            </template>
          </v-data-table>
          <DialogConfirm ref="dialogDelete" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
