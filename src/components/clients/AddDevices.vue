<script setup>
import { useClient } from '@/@core/stores/client'
import { useToast } from '@/@core/stores/toastConfig'
import { useI18n } from 'vue-i18n'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'



const store = useClient()
const storeToast = useToast()
const { t } = useI18n()



const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true,
    },
    update_dataId: {
        type: Number || null,
        default: null
    }
})

const emit = defineEmits([
    'update:isDrawerOpen',
    'update:update_dataId',
    'refresh'
])

const isFormValid = ref(false)
const refForm = ref()







const deviceData = ref({
    username: null,
    email: null,

})
const isPasswordVisible = ref(false)

const handleSuccess = () => {
    storeToast.successToast(t('success'))
    emit('update:isDrawerOpen', false)
    emit('update:update_dataId', null)
    emit('refresh')
    nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
    })
}

// 👉 drawer close
const closeNavigationDrawer = () => {
    emit('update:isDrawerOpen', false)
    emit('update:update_dataId', null)
    nextTick(() => {
        refForm.value?.reset()
        deviceData.value.status = true
        refForm.value?.resetValidation()
    })
}

const onSubmit = () => {
    refForm.value?.validate().then(({ valid }) => {
        console.log(refForm.value);


        if (valid) {
            store.createDevice(deviceData.value)
                .then(res => {
                    handleSuccess()

                }).catch(error => {
                    storeToast.errorToast(error.response._data.message)
                })

        } else {
            storeToast.errorToast(t('required_fiels'))


        }
    })
}

const handleDrawerModelValueUpdate = val => {
    emit('update:isDrawerOpen', val)
    emit('update:update_dataId', null)
    nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
    })
}


</script>

<template>
    <VNavigationDrawer temporary :width="400" location="end" class="scrollable-content"
        :model-value="props.isDrawerOpen" @update:model-value="handleDrawerModelValueUpdate">
        <!-- 👉 Title -->
        <AppDrawerHeaderSection :title="!props.update_dataId ? $t('settingsModule.add') : $t('settingsModule.edit')"
            @cancel="closeNavigationDrawer" />

        <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VCard flat>
                <VCardText>


                    <!-- 👉 Form -->
                    <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
                        <VRow>



                            <!-- 👉 Username -->
                            <VCol cols="12">
                                <AppTextField v-model="deviceData.username" :rules="[requiredValidator]"
                                    label="ID устройства" :requireInput="true" />
                            </VCol>


                            <!-- 👉 f_name -->
                            <VCol cols="12">
                                <AppTextField v-model="deviceData.f_name" label="Тип ID " :requireInput="true" />
                            </VCol>

















                            <!-- 👉 Submit and Cancel -->
                            <VCol cols="12">
                                <VBtn type="submit" class="me-3">
                                    {{ $t('settingsModule.send') }}
                                </VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </PerfectScrollbar>
    </VNavigationDrawer>
</template>
