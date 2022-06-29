<template>
    <div>
        <div class="max-w-7xl">
            <div class="flex justify-start items-center mb-20">
                <img src="@/assets/logo.svg" />
            </div>
            <div class="w-full max-w-lg mx-auto my-auto py-8">
                <h3 class="mb-1 text-3xl font-bold">Get started with a free account</h3>
                <div class="text-lg text">
                    <p>Sign up in seconds!</p>
                </div>

                <form id="login-form" class="flex flex-col gap-8 mt-10" novalidate="" @submit.prevent="handleSubmit">
                    <div>
                        <label class="form-label" for="email">Username</label>
                        <input type="text" class="input input-lg" v-model="form.username" />

                        <small id="error-email" class="text-red-600 hidden"></small>
                    </div>

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

                    <div>
                        <label class="form-label" for="password">Confirm Password</label>
                        <input type="password" class="input input-lg" v-model="form.password_confirmation" />

                        <small id="error-password" class="text-red-600 hidden"></small>
                    </div>

                    <div>
                        <div class="flex items-center gap-3">
                            <input type="checkbox" class="checkbox" id="agree" name="agree" value="1" required>
                            <label class="text-tiny" for="agree">
                                I agree to the <a href="#" class="underline hover:text-secondary-600">Terms of Use</a>, <a href="#" class="underline hover:text-secondary-600">Privacy Policy</a> and the <a href="#" class="underline hover:text-secondary-600">Anti-Spam Policy</a>
                            </label>
                        </div>
                        <small id="error-agree" class="text-red-600 hidden"></small>
                    </div>

                    <div>
                        <div class="flex items-center gap-3">
                            Already have an account? <a href="/login" class="underline hover:text-secondary-600">login</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="btn btn-secondary btn-lg w-full text-white">
                                <span class="hidden">
                                    <svg class="inline-block animate-spin -ml-1 -mt-0.5 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            Register
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
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

        const authStore = useAuthStore();

        const handleSubmit = async () => {
            const { username, email, password, password_confirmation} = form.value;

            const data = await authStore.register(username, email, password, password_confirmation);
        };

        return {
            form,
            handleSubmit
        };

    }
}
</script>
