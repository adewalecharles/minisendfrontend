<template>
    <div class="dashboard">
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {{user.username}}
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useUsersStore } from "../stores/user";
import { useMailStore } from "../stores/mail";
export default {
    components: {  },
    setup() {
        const user = useUsersStore().user;
        const mails = ref(useMailStore.mails);
        const cardStats = ref([
            {
                text: "Total Mails",
                count: 33,
            },
            {
                text: "Total Users",
                count: 33,
            },
            {
                text: "Total Groups",
                count: 33,
            },
            {
                text: "Total Templates",
                count: 33,
            },
        ]);

        return {
            user,
            mails,
            cardStats,
        };
    }
}
</script>