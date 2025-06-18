import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ShopView from "@/views/ShopView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import DashboardView from "@/views/DashboardView.vue";
import TodosView from "@/views/TodosView.vue";

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
        {
            path: "/dash",
            name: "dashboard",
            component: DashboardView
        },
        {
            path: "/todos",
            name: "dashboard",
            component: TodosView
        },

        {
            path: "/:pathMatch(.*)*",
            name: "not found",
            component: NotFoundView
        }
    ]
})

export default router