import { $api } from "@/utils/api";
import { defineStore } from "pinia";

export const useRequests = defineStore("request", {

    state: () => ({
        requests: null

    }),
    actions: {
        async fetchRequest(per_page, page) {
            return await $api(`api/request?per_page=${per_page}&page=${page}`).then(res => {
                this.requests = res.result
            })
        },

        async createStatus(id, data) {
            return await $api(`api/request/action/admin/${id}`, {
                body: data,
                method: 'POST'

            })
        },
        async deleteRequest(id) {
            return await $api(`api/request/delete/${id}`, {
                method: 'delete'
            })
        },
        async filterRequest(status) {
            return await $api(`api/request?status=${status}`)
                .then(res => {
                    this.requests = res.result


                })
        }


    }
})
