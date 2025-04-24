import { $api } from "@/utils/api";
import { defineStore } from "pinia";

export const useCertificate = defineStore("certificate", {

    state: () => ({
        certificates: null

    }),
    actions: {



        async fetchCertificate(per_page, page) {
            return await $api(`api/certificate?per_page=${per_page}&page=${page}`).then(res => {
                this.certificates = res.result
            })
        },


        async deleteCertificate(id) {
            return await $api(`api/certificate/delete/${id}`, {
                method: 'delete'
            })
        },
        async filterCertificate(status) {
            return await $api(`api/certificate?status=${status}`)
                .then(res => {
                    console.log(res);

                    this.certificates = res.result


                })
        }


    }
})
