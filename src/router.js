import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantsPage from "./pages/RestaurantsPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import RestaurantMenuPage from "./pages/RestaurantMenuPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";
// import SingleProjectPage from "./pages/SingleProjectPage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/restaurants",
            name: "restaurants",
            component: RestaurantsPage,
        },
        {
            path: "/about",
            name: "about",
            component: AboutPage,
        },
        {
            path: "/contact",
            name: "contact",
            component: ContactPage,
        },
        {
            path: "/restaurant_menu",
            name: "restaurant_menu",
            component: RestaurantMenuPage,
        },
        {
            path: "/payment",
            name: "payment",
            component: PaymentPage,
        }

        ,
        // {
        //     path: "/projects/:slug",
        //     name: "single-post",
        //     component: SingleProjectPage,
        // },
    ]
});
export { router };