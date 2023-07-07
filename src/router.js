import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
// import ProjectsPage from "./pages/ProjectsPage.vue";
// import AboutPage from "./pages/AboutPage.vue";
// import ContactPage from "./pages/ContactPage.vue";
// import SingleProjectPage from "./pages/SingleProjectPage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        // {
        //     path: "/projects",
        //     name: "projects",
        //     component: ProjectsPage,
        // },
        // {
        //     path: "/about",
        //     name: "about",
        //     component: AboutPage,
        // },
        // {
        //     path: "/contact",
        //     name: "contact",
        //     component: ContactPage,
        // },
        // {
        //     path: "/projects/:slug",
        //     name: "single-post",
        //     component: SingleProjectPage,
        // },
    ]
});
export { router };