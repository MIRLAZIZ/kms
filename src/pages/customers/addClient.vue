<script setup>
import { useClient } from '@/@core/stores/client'
import { reactive } from 'vue'
import { VForm } from 'vuetify/components/VForm'

const store = useClient()

definePage({
    meta: {
        action: 'read',
        subject: 'AclDemo',
    }
})
const refForm = ref()

const clientData = reactive({
    operator: '', //✅
    typeCert: '', //✅
    typeClient: '', //✅
    cert_type: '', //✅
    local_code: '', //✅

    cname: '', //✅
    sname: '',  //✅
    iabsID: '',  //✅ 
    password: '',
    location: '',
    state: '',
    country: '',
    address: '',
    email: '',
    organisation: '',
    phone: '',
    ou: '',
    inn: '',
    pinfl: '',

    accname: '',
    job: '',
    token_type: '',
    token_sn: '',
    token_serialnumber: '',
    csr: '',
    container: '',
    fileToUpload: null,

})
const fileRequired = ref(false)




// 'operator'          => ['nullable', 'string'],
//   'typeCert'          => ['nullable', 'string'],
//   'typeClient'        => ['nullable', 'string'],
//   'cert_type'         => ['nullable', 'string'],
//   'local_code'        => ['nullable', 'string'],

//   'cname'             => ['required', 'string', 'max:100'],
//   'sname'             => ['nullable', 'string', 'max:100'],
//   'iabsID'            => ['required', 'string'],
//   'password'          => ['required', 'string', 'min:8'],
//   'location'          => ['required', 'string'],
//   'state'             => ['required', 'string'],
//   'country'           => ['required', 'string'],
//   'address'           => ['required', 'string'],
//   'email'             => ['required', 'email', 'unique:clients,email'],
//   'organisation'      => ['required', 'string'],
//   'phone'             => ['required', 'numeric', 'digits:12'],
//   'ou'                => ['required', 'string'],
//   'inn'               => ['nullable', 'string'],
//   'pinfl'             => ['nullable', 'string'],

//   'accname'           => ['nullable', 'string'],
//   'job'               => ['nullable', 'string'],
//   'token_type'        => ['nullable', 'string'],
//   'token_sn'          => ['nullable', 'string'],
//   'token_serialnumber'=> ['nullable', 'string'],
//   'csr'               => ['nullable', 'string'],
//   'container'         => ['nullable', 'string'],
//   'fileToUpload'      => ['required', 'file', 'mimes:pdf', 'max:10240'],


const onSubmit = () => {

    refForm.value?.validate().then(({ valid }) => {
        if (!clientData.fileToUpload) {
            fileRequired.value = true
        } else {
            fileRequired.value = false
        }



        const formData = new FormData()
        formData.append('operator', clientData.operator)
        formData.append('typeCert', clientData.typeCert)
        formData.append('typeClient', clientData.typeClient)
        formData.append('cert_type', clientData.cert_type)
        formData.append('local_code', clientData.local_code)

        formData.append('cname', clientData.cname)
        formData.append('sname', clientData.sname)
        formData.append('iabsID', clientData.iabsID)
        formData.append('password', clientData.password)
        formData.append('location', clientData.location)
        formData.append('state', clientData.state)
        formData.append('country', clientData.country)
        formData.append('address', clientData.address)
        formData.append('email', clientData.email)
        formData.append('organisation', clientData.organisation)
        formData.append('phone', clientData.phone)
        formData.append('ou', clientData.ou)
        formData.append('inn', clientData.inn)
        formData.append('pinfl', clientData.pinfl)

        formData.append('accname', clientData.accname)
        formData.append('job', clientData.job)
        formData.append('token_type', clientData.token_type)
        formData.append('token_sn', clientData.token_sn)
        formData.append('token_serialnumber', clientData.token_serialnumber)
        formData.append('csr', clientData.csr)
        formData.append('container', clientData.container)
        formData.append('fileToUpload', clientData.fileToUpload)

        console.log(valid);





        if (valid) {

            store.createClients(formData)
            // .then(res => {


            //     // handleSuccess()



            // }).catch(error => {
            //     console.log(error, 'errror');

            //     // storeToast.errorToast(error.response._data.message)
            // })




        } else {
            // storeToast.errorToast(t('required_fiels'))


        }
    })
}


const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        fileRequired.value = false
        clientData.fileToUpload = file;
    } else {
        fileRequired.value = true
    }
};

</script>

<template>

    <VCard title="Add Client" class="py-6 px-6">
        <VForm ref="refForm" @submit.prevent="onSubmit">
            <VRow>

                <!-- iabsID  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.iabsID" :rules="[requiredValidator]" label="IABS ID"
                        :requireInput="true" />
                </VCol>

                <!-- operator  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.operator" label="Operator" />
                </VCol>

                <!-- typeCert  -->
                <VCol cols="12" md="6">
                    <AppSelect v-model="clientData.typeCert" label="typeCert"
                        :items="['user', 'admin', 'limited', 'operator']" />
                </VCol>

                <!-- typeClient -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.typeClient" label="typeClient" />
                </VCol>


                <!-- cname -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.cname" :rules="[requiredValidator]" :requireInput="true"
                        label="Cname" />
                </VCol>

                <!-- city location  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.location" label="Location" :requireInput="true"
                        :rules="[requiredValidator]" />
                </VCol>

                <!-- country -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.country" :rules="[requiredValidator]" :requireInput="true"
                        label="Страна (двухбуквенный индекс) (C)" />
                </VCol>

                <!-- state  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.state" persistent-placeholder label="oblast"
                        :rules="[requiredValidator]" :requireInput="true" />
                </VCol>

                <!-- address  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.address" :rules="[requiredValidator]" :requireInput="true"
                        label="Address" />
                </VCol>

                <!-- email -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.email" :rules="[requiredValidator, emailValidator]"
                        :requireInput="true" label="Email" />
                </VCol>


                <!-- organisation  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.organisation" :rules="[requiredValidator]" :requireInput="true"
                        label="Organisation" />
                </VCol>


                <!-- organisation ou  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.ou" label="organisation OU" :requireInput="true"
                        :rules="[requiredValidator]" />
                </VCol>
                <!-- phone  -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.phone"
                        :rules="[requiredValidator, minLengthValidator(clientData.phone, 12)]" label="Phone"
                        :requireInput="true" type="number" />
                </VCol>

                <!-- type token  -->
                <VCol cols="12" md="6">
                    <AppSelect v-model="clientData.token_type" label="type token"
                        :items="['user', 'admin', 'limited', 'operator']" />
                </VCol>

                <!-- token_sn -->
                <VCol cols="12" md="6">
                    <AppTextField v-model="clientData.token_serialnumber" label="token_serialnumber"
                        append-inner-icon="tabler-eye-off" :rules="[requiredValidator]" :requireInput="true" />
                </VCol>





                <!-- file upload  -->
                <VCol cols="12" md="6" class="">
                    <label> {{ $t('clients.attachRequestFile') }}<span class="asterisk">*</span>
                    </label>

                    <div class="custom-file-upload border " :class="{ 'fileInput': fileRequired }">
                        <label for="file-upload">
                            <VIcon icon="tabler-upload" />
                            <span id="file-name">{{ $t('clients.chooseFile') }}</span>
                        </label>
                        <input id="file-upload" type="file" hidden @change="handleFileChange">
                    </div>
                    <small class="asterisk" v-if="fileRequired">this field is required</small>


                </VCol>
                <!-- <VCol cols="12" md="6">
                    <VTextField v-model="clientData.token_serialnumber" label="token_serialnumber"
                        append-inner-icon="tabler-eye-off" :rules="[requiredValidator]" :requireInput="true" />
                </VCol> -->
                <VCol cols="12">
                    <VBtn type="submit">
                        Submit
                    </VBtn>
                </VCol>
            </VRow>
        </VForm>
    </VCard>
</template>


<style lang="scss">
.custom-file-upload {
    // border: 2px solid #d1d5db;
    border-radius: 6px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

}

.custom-file-upload label {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    color: #4b5563;
    width: 100%;
    padding: 9px;
}

.asterisk {
    color: #ea5455;
}

.fileInput {
    border-color: red !important;


}
</style>
