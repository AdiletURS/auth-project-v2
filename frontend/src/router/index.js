import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ShopView from "@/views/ShopView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/shop",
            name: "shop",
            component: ShopView
        },

        /*{
            path: "/reg",
            name: "sign up",
            component: SignUpView
        },{

            path: "/login",
            name: "sign in",
            component: SignUpView
        }*/
    ]
})

export default router