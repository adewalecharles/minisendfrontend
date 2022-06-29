import { defineStore } from 'pinia';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useMailStore = defineStore('mails',{
  state: () => ({
    mails: [],
  }),
  persist: true,
  actions: {
    async getMails() {
      const { response } = await axios.get(`${baseUrl}/get-emails`);
      this.mails = response.data.data;
      return this.mails;
    },
    async getMail(id) {
      const { response } = await axios.get(`${baseUrl}/get-email/`+id);
      return response.data.data;
    },
    async getEmailToken() {
      const { response } = await axios.get(`${baseUrl}/get-email-token`);
      return response.data.data;
    }
  },
});