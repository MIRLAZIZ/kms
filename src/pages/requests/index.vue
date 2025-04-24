<script setup>
import { useRequests } from '@/@core/stores/request'
import { useToast } from '@/@core/stores/toastConfig'
import DeleteDialog from "@/components/DeleteDialog.vue"
import StatusDescription from '@/components/request/StatusDescription.vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VDataTable } from 'vuetify/labs/VDataTable'



const { t } = useI18n()
definePage({
    meta: {
        action: 'read',
        subject: 'AclDemo',
    }
})

const deleteDialog = ref(false)
const itemId = ref(null)
const storetoast = useToast()
const isDialogVisible = ref(false)




const deleteItemConfirm = () => {
    store.deleteRequest(itemId.value)
        .then(() => {
            storetoast.successToast(t('settingsModule.user_deleted'))
            deleteDialog.value = false
            itemId.value = null
            refresh()
        }).catch(error => {
            storetoast.errorsNotfications(error.response._data.errors)


        })
}


const options = ref({ page: 1, itemsPerPage: 12, sortBy: [''], sortDesc: [false] })
const isAddNewUserDrawerVisible = ref(false)
const load = ref(true)
const store = useRequests()
const statusData = ref(null)
const request_id = ref(null)
const status = ref(null)



const headers = [
    { title: '№', key: 'id' },
    { title: 'Токен №', key: 'token_sn' },
    { title: 'Видан (CN)', key: 'cname' },
    { title: 'Организация (О)', key: 'organization' },
    { title: 'Подразделение (ОU)', key: 'org_unit' },
    { title: t('settingsModule.branch'), key: 'branch' },
    { title: 'type', key: 'type' },
    { title: t('settingsModule.action'), key: 'actions' },
]



const typeDevice = (data) => {
    if (data == 1) {
        return t('clients.internet_banking')
    }

    else if (data == 2) {
        return t('clients.mobile_banking')
    }

    else if (data == 3) {
        return t('clients.iabs_user')
    }
    else {
        return ''
    }



}






const deleteUser = (id) => {
    itemId.value = id
    deleteDialog.value = true
}

const statusCreate = (value, id) => {
    request_id.value = id
    statusData.value = value
    isAddNewUserDrawerVisible.value = true
}

const refresh = () => {
    store.fetchRequest(options.value.itemsPerPage, options.value.page)
        .then(() => {

            load.value = false
        }).catch(error => {
            if (error.response.status >= 500) {
                storetoast.errorToast('server xatoligi')

            }
            else {
                storetoast.errorsNotfications(error.response._data.errors)

            }

            load.value = false
        })
}


watch(status, (newValue) => {
    if (newValue) {
        store.filterRequest(newValue)
    }
    else {
        refresh()
    }
})



onMounted(() => {
    refresh()

})
const getRowProps = (item) => {

    if (!item) return {}

    if (item.status === 2) return 'green-row'
    return {}
}

const statuFilterData = ref([
    { value: 0, label: 'new' },
    { value: 1, label: 'tasdiqlangan' },
    { value: 2, label: 'rad etilgan' },

])


</script>

<template>
    <VCard style="overflow-x: auto;">

        <VRow class="px-4 py-4">
            <VCol>
                <p class="text-22 font-roboto">
                    <VIcon size="22" icon="tabler-user" /> {{ $t('settingsModule.control') }}
                </p>
            </VCol>
            <VCol class="d-flex justify-end">


                <VCol cols="12" sm="6">
                    <AppTextField placeholder="Search" density="compact" prepend-inner-icon="tabler-search" />
                </VCol>
                <!-- 👉 Select Status -->
                <VCol cols="12" sm="4">
                    <AppSelect placeholder="Select Status" :items="statuFilterData" v-model="status" clearable
                        clear-icon="tabler-x" item-value="value" item-title="label" />
                </VCol>


                <VCol cols="12" sm="5">
                    <div class="w-100 h-100 border rounded d-flex align-center justify-space-between px-4">
                        <div>
                            {{ $t('clients.all') }}
                        </div>

                        <div>
                            <VIcon size="24" icon="tabler-history" color="#00BAD1" class="mr-1" />
                            <span>{{ store.requests?.status_report?.new ? store.requests?.status_report?.new : 0
                                }}</span>
                        </div>


                        <div>
                            <VIcon size="24" icon="tabler-circle-check" color="#28C76F" class="mr-1" />
                            <span>{{ store.requests?.status_report?.approved ? store.requests?.status_report?.approved :
                                0 }}</span>
                        </div>


                        <div>
                            <VIcon size="24" icon="tabler-circle-x" color="#FF4C51" class="mr-1" />
                            <span>{{ store.requests?.status_report?.rejected ? store.requests?.status_report?.rejected :
                                0 }}</span>
                        </div>








                    </div>

                </VCol>

                <VCol col="12">

                    <AppSelect :model-value="options.itemsPerPage" :items="[
                        { value: 10, title: '10' },
                        { value: 25, title: '25' },
                        { value: 50, title: '50' },
                        { value: 100, title: '100' },
                        { value: -1, title: 'All' },
                    ]" style="inline-size: 6.25rem;"
                        @update:model-value="options.itemsPerPage = parseInt($event, 10)" />
                </VCol>

            </VCol>

        </VRow>
        <VDataTable :headers="headers" :items="store.requests?.data || []" :loading="load" :hover="true"
            loading-text="yuklanmoqda">
            <template #item="{ item, columns }">
                <tr :class="getRowProps(item)">
                    <td v-for="column in columns" :key="column.key">

                        <slot :name="`item.${column.key}`" :item="item" :index="item.index">


                            <!-- actions ustunini alohida chiqarish -->
                            <template v-if="column.key === 'actions'">
                                <div class=" d-flex justify-center">
                                    <VBtn icon variant="text" size="small" color="medium-emphasis">
                                        <VIcon size="24" icon="tabler-dots-vertical" />
                                        <VMenu activator="parent">
                                            <VList>
                                                <VListItem link @click="statusCreate('confirmation', item.id)">
                                                    <template #prepend>
                                                        <VIcon icon="tabler-circle-check" color="#28C76F" />
                                                    </template>
                                                    <VListItemTitle>Tasdiqlash</VListItemTitle>
                                                </VListItem>

                                                <VListItem @click="statusCreate('rejection', item.id)">
                                                    <template #prepend>
                                                        <VIcon icon="tabler-circle-x" color="#FF4C51" />
                                                    </template>
                                                    <VListItemTitle>Rad etish</VListItemTitle>
                                                </VListItem>

                                                <!-- delete -->
                                                <VListItem @click="deleteUser(item.id)">
                                                    <template #prepend>
                                                        <VIcon icon="tabler-trash" color="#FF4C51" />
                                                    </template>
                                                    <VListItemTitle>Delete</VListItemTitle>
                                                </VListItem>
                                            </VList>
                                        </VMenu>
                                    </VBtn>
                                </div>
                            </template>
                            <template v-else-if="column.key == 'type'">
                                {{ typeDevice(item.type) }}

                            </template>


                            <!-- boshqa ustunlar uchun oddiy value -->
                            <template v-else>
                                {{ item[column.key] }}
                            </template>
                        </slot>
                    </td>
                </tr>
            </template>



            <template #no-data>
                <div class="text-center py-4">
                    {{ $t('no_data') }}

                </div>
            </template>










            <!-- bottom pagination  -->
            <template #bottom>
                <VCardText class="pt-2">
                    <div class="d-flex justify-end">
                        <VPagination v-if="store.requests?.pagination" v-model="options.page"
                            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                            :length="Math.ceil(store.requests?.pagination?.total / options.itemsPerPage)"
                            @click="refresh" />
                    </div>
                </VCardText>

            </template>
        </VDataTable>
    </VCard>


    <!-- <AddNewUserDrawer v-model:isDrawerOpen="isAddNewUserDrawerVisible" v-model:update_dataId="updateDataId"
        @refresh="refresh" /> -->
    <StatusDescription v-model:isDrawerOpen="isAddNewUserDrawerVisible" v-model:status_type="statusData"
        @refresh="refresh" :request_id="request_id" />


    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
        @deleteItemConfirm="deleteItemConfirm" />





</template>


<style scom>
.v-data-table thead th {
    background-color: #f3f2f3;
    border-spacing: 0;

}

.green-row {
    background-color: #ffd0d4 !important;
}
</style>
