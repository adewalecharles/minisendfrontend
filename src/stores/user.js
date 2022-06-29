import { defineStore } from 'pinia';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore('user',{
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || {},
  }),
  persist: true,
  actions: {
  },
  getters: {
    getUser: state => () => {
      return state.user
    },
  }
});