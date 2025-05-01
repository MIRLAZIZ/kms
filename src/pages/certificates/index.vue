<script setup>
import { useCertificate } from '@/@core/stores/certicate'
import { useToast } from '@/@core/stores/toastConfig'
import EditClient from '@/components/clients/EditClient.vue'
import DeleteDialog from "@/components/DeleteDialog.vue"
import jsPDF from 'jspdf'
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

    console.log('deleteItemConfirm');

    // store.deleteCertificate(itemId.value)
    //     .then(() => { 
    //         storetoast.successToast(t('settingsModule.user_deleted'))
    //         deleteDialog.value = false
    //         itemId.value = null
    //         refresh()
    //     }).catch(error => {
    //         storetoast.errorsNotfications(error.response._data.errors)


    //     })
}


const options = ref({ page: 1, itemsPerPage: 12, sortBy: [''], sortDesc: [false] })
const isAddNewUserDrawerVisible = ref(false)
const load = ref(true)
const store = useCertificate()
const updateDataId = ref(null)
const status = ref(null)



// "owner_name": "Ф.И.О владельца",
//     "token_serial_number": "Серийный номер токена",
//     "certificate_serial_number": "Серийный номер сертификата",
//     "from_date": "С (дата)",
//     "to_date": "До (дата)",
//     "date": "Дата",
//     "status": "Статус",
//     "action": "Действие"


const headers = computed(() => [
    { title: '№', key: 'id' },
    { title: t('certificates.owner_name'), key: 'cname' },
    { title: t('certificates.token_serial_number'), key: 'token_sn' },
    { title: t('certificates.certificate_serial_number'), key: 'cert_sn' },
    { title: t('certificates.from_date'), key: 'cert_from' },
    { title: t('certificates.to_date'), key: 'cert_to' },
    { title: t('certificates.status'), key: 'status' },
    { title: 'pdf', key: 'pdf' },
    { title: t('settingsModule.action'), key: 'actions' },
])






const deleteItem = (id) => {
    itemId.value = id
    deleteDialog.value = true
}


const refresh = () => {
    store.fetchCertificate(options.value.itemsPerPage, options.value.page)
        .then(() => {


            load.value = false
        }).catch(error => {
            console.log(error.response.status);
            if (error.response.status >= 500) {
                storetoast.errorToast('server xatoligi')

            }
            else {
                // storetoast.errorsNotfications(error.response._data.errors)

            }

            load.value = false
        })
}






onMounted(() => {
    refresh()

})
const getRowProps = (item) => {

    if (!item) return {}

    if (item.status === 1) return 'green-row'
    return {}
}

const statuFilterData = ref([
    { value: 3, label: 'Активный' },
    { value: 1, label: 'Отклоненные' },
    { value: 2, label: 'Обновлен' },

])

const statusText = (status) => {
    if (status === 3) return { class: 'active', text: 'Активный' }
    if (status === 1) return { class: 'error', text: 'Отклоненные' }
    if (status === 2) return { class: 'history', text: 'Обновлен' }
}
watch(status, (newValue) => {
    if (newValue) {
        store.filterCertificate(newValue)
    }
    else {
        refresh()
    }
})
watch(() => options.value.itemsPerPage, (newValue) => {
    if (newValue) {
        refresh()
    }
}, { deep: true })






const downloadPDF = (data) => {
    const doc = new jsPDF();

    // Kirill shriftini qo'shish
    doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');

    // Dokumentga ma'lumotlarni yozish
    doc.text('Регистрационный сертификат: ' + data.cname, 10, 10);
    doc.text('Сертификат рақами: ' + data.cert_sn, 10, 20);
    doc.text('Токен рақами: ' + data.token_sn, 10, 30);
    doc.text('Сертификат санаси (дан): ' + data.cert_from, 10, 40);
    doc.text('Сертификат санаси (гача): ' + data.cert_to, 10, 50);

    // PDF faylni saqlash
    doc.save(data.cname + '.pdf');
}


</script>

<template>
    <VCard>




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
                            <VIcon size="24" icon="tabler-circle-check" color="#28C76F" class="mr-1" />
                            <span>3</span>
                        </div>
                        <div>
                            <VIcon size="24" icon="tabler-circle-x" color="#FF4C51" class="mr-1" />
                            <span>5</span>
                        </div>
                        <div>
                            <VIcon size="24" icon="tabler-history" color="#00BAD1" class="mr-1" />
                            <span>3</span>
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
        <VDataTable :headers="headers" :items="store.certificates?.data || []" :loading="load" :hover="true"
            loading-text="yuklanmoqda" :items-per-page="options.itemsPerPage">
            <template #item="{ item, columns }">
                <tr :class="getRowProps(item)">
                    <td v-for="column in columns" :key="column.key">

                        <slot :name="`item.${column.key}`" :item="item" :index="item.index">


                            <!-- actions ustunini alohida chiqarish -->
                            <template v-if="column.key === 'actions'">
                                <div class="py-2">
                                    <VListItemTitle class=" cursor-pointer text-cancel " @click="deleteItem(item.id)"
                                        v-if="item.status == 3">
                                        Bekor
                                        qilish
                                    </VListItemTitle>
                                    <span v-else class="">Bekor qilingan</span>
                                </div>


                            </template>

                            <template v-else-if="column.key === 'status'"><span v-if="item.status"
                                    :class="statusText(item.status).class">{{ statusText(item.status).text }}</span>
                            </template>
                            <template v-else-if="column.key === 'pdf'">
                                <VListItemTitle class=" cursor-pointer text-cancel " @click="downloadPDF(item)">
                                    download
                                </VListItemTitle>


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
                        <VPagination v-if="store.certificates?.pagination" v-model="options.page"
                            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                            :length="Math.ceil(store.certificates?.pagination?.total / options.itemsPerPage)"
                            @click="refresh" />
                    </div>
                </VCardText>

            </template>
        </VDataTable>
    </VCard>


    <!-- <AddNewUserDrawer v-model:isDrawerOpen="isAddNewUserDrawerVisible" v-model:update_dataId="updateDataId"
        @refresh="refresh" /> -->
    <EditClient v-model:isDrawerOpen="isAddNewUserDrawerVisible" v-model:update_dataId="updateDataId"
        @refresh="refresh" />


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

.active {
    color: #28C76F !important;
}

.history {
    color: #00BAD1 !important;
}

.error {
    color: #FF4C51 !important;
}
</style>
