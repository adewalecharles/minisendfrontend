import { defineStore } from 'pinia';
import router from '../router/index';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore('auth',{
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  persist : true,
  actions: {
    async login(email, password) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, {email, password });

          this.token = data.data.token;
          this.user = data.data.user;

          // store user details and jwt in local storage to keep user logged in between page refreshes
          if (this.token) localStorage.setItem('token', this.token);
          if (this.user) localStorage.setItem('user', JSON.stringify(this.user));
          if (this.isAuthenticated) localStorage.setItem('isAuthenticated', this.isAuthenticated);

          // redirect to previous url or default to home page
        if (this.isAuthenticated) await router.push('/dashboard');

      } catch (e) {
        console.log(e);
      }
    },

    async register(username,email, password, password_confirmation) {

      try {
        const { data } = await axios.post(`${baseUrl}/register`, {username, email, password, password_confirmation });

        this.user = data.data.user;
        this.token = data.data.token;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        if (this.token) localStorage.setItem('token', this.token);
        if (this.user) localStorage.setItem('user', JSON.stringify(this.user));
        if (this.isAuthenticated) localStorage.setItem('isAuthenticated', this.isAuthenticated);

        // redirect to previous url or default to home page
        if (this.isAuthenticated) await router.push('/dashboard');
      } catch (e) {
        console.log(e);
      }

    },

    async logout() {
      try {
        const { data } = await axios.post(`${baseUrl}/logout`, {}, { headers: { Authorization: `Bearer ${this.token}` } });

        this.user = null;

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.isAuthenticated = false;

        await router.push('/login');

      }catch (e) {
        console.log(e);
      }
    },

    async refreshToken() {
      try {
        const { data } = await axios.post(`${baseUrl}/refresh-token`, {}, { headers: { Authorization: `Bearer ${this.token}` } });
        localStorage.removeItem('token');
        localStorage.setItem('token', data.data.token);
      }catch (e) {
        console.log(e);
      }
    }
  }
});