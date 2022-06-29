<template>
      <div>
          <div class="max-w-7xl">
              <div class="flex justify-start items-center mb-20">
                  <img src="@/assets/logo.svg" />
              </div>
              <div class="w-full max-w-lg mx-auto my-auto py-8">
                  <h3 class="mb-1 text-3xl font-bold">Welcome back</h3>

                  <div class="text-lg text">
                      <p>Don't have an account? <a href="/signup" class="underline">Sign up</a></p>
                  </div>

                  <form id="login-form" class="flex flex-col gap-8 mt-10" novalidate="" @submit.prevent="handleSubmit">
                      <div>
                          <label class="form-label" for="email">Email</label>
                          <input type="email" class="input input-lg" v-model="form.email" />

                          <small id="error-email" class="text-red-600 hidden"></small>
                      </div>

                      <div>
                          <label class="form-label" for="password">Password</label>
                          <input type="password" class="input input-lg" v-model="form.password" />

                          <small id="error-password" class="text-red-600 hidden"></small>
                      </div>

                      <div class="flex justify-between text">
                          <div class="flex items-center gap-3">
                              <input type="checkbox" class="checkbox" v-model="form.remember" name="remember" id="remember" value="1" />
                              <label class="" for="remember">
                                  Keep me logged in
                              </label>
                          </div>
                      </div>

                      <div>
                          <button type="submit" class="btn btn-secondary btn-lg w-full text-white">
                                <span class="" v-if="loading">
                                    <svg class="inline-block animate-spin -ml-1 -mt-0.5 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                                Log in
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
</template>

<script>
import { ref } from "vue";
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {

    const form = ref({
        email: "",
        password: "",
        remember: false
    });
    const loading = ref(false);

    const authStore = useAuthStore();

    const handleSubmit = async () => {
        const { email, password,remember } = form.value;
        loading.value = true;
        const data = await authStore.login(email, password, remember);
        loading.value = false;
    };
      return {
            form,
            handleSubmit,
          loading
      };

  }
}
</script>
