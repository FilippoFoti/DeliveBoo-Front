<script>
export default {
    name: 'NavHeader',
    data() {
        return {
            navList: [
                {
                    name: "Home",
                    routeName: "home"
                },
                {
                    name: "Restaurants",
                    routeName: "restaurants"
                },
                {
                    name: "About Us",
                    routeName: "about"
                },
                {
                    name: "Contact Us",
                    routeName: "contact"
                }
            ]
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <router-link to="/">
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/rubber-156597_1280.png" alt="Logo">
                    <p class="m-0 ps-2">DeliveBoo</p>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="menu navbar-nav m-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-for="list in navList">
                            <router-link :to="{ name: list.routeName }" class="nav-link">
                                {{ list.name }}
                            </router-link>
                        </li>
                    </ul>
                    <ul class="icon p-0 m-0">
                        <li><i class="fa-solid fa-magnifying-glass"></i></li>
                        <li><i class="fa-regular fa-user"></i></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

header {
    height: 80px;
    width: 100%;
    position: fixed;
    z-index: 999;

    .navbar {
        background-color: white !important;

        .container {

            a {
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 50px;
                }

                p {
                    font-size: 1.7rem;
                    font-family: 'Caprasimo', cursive;
                    color: #F2C802;
                }
            }

            .menu {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .icon {
                list-style-type: none;
                display: flex;
                align-items: center;
                justify-content: end;
                gap: 15px;
                width: 200px;

                @media screen and (max-width: 992px) {
                    display: none;
                }
            }
        }

    }
}
</style>