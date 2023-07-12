<script>
export default {
    name: 'NavHeader',
    data() {
        return {
            showAccount: false,
            showInput: false,
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
    },

    methods: {
        showMenu() {
            this.showAccount = true;
        },
        hideMenu() {
            this.showAccount = false;
        },
        // buttonClicked(button) {
        //     if (button === 'registrati') {
        //         window.location.href = 'http://localhost:8000/register';
        //     } else if (button === 'login') {
        //         window.location.href = 'http://localhost:8000/login';
        //     }
        // }
        buttonClicked(button, link) {
            window.open(link, '_blank');
        },

        showSearch() {
            this.showInput = true;
        },
        hideSearch() {
            this.showInput = false;
        },
        isActive(route) {
            return this.$route.name === route;
        }
    }
}
</script>

<template>
    <header class="shadow">
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
                            <router-link :to="{ name: list.routeName }" class="nav-link"
                                :class="{ active: isActive(list.routeName) }">
                                {{ list.name }}
                            </router-link>
                        </li>
                    </ul>
                    <ul class="icon p-0 m-0">
                        <li @click="showSearch"><i class="fa-solid fa-magnifying-glass"></i></li>
                        <li @click="showMenu"><i class="fa-regular fa-user"></i></li>
                    </ul>
                </div>
            </div>

            <div v-if="showInput">
                <div class="search">
                    <div class="search-content">

                        <label for="search"></label>
                        <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Cerca qualcosa..." aria-label="Search">

                        <button @click="hideSearch" class="btn-close close-search" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            <div v-if="showAccount">
                <div class="popup">
                    <div class="popup-content p-4 text-center">
                        <h2 class="fw-bold pb-4">Sei un ristoratore? <br> Registra il tuo ristorante!</h2>

                        <button class="account"
                            @click="buttonClicked('registrati', 'http://localhost:8000/register')">Registrati</button>
                        <button class="account"
                            @click="buttonClicked('login', 'http://localhost:8000/login')">Login</button>

                        <button @click="hideMenu" class="btn-close close-button" aria-label="Close"></button>
                    </div>
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
        height: 80px;

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

                @media screen and (max-width: 992px) {
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: row;
                    gap: 10px;
                    background-color: #03071E;
                    border: 1px solid #F2C802;
                    border-radius: 10px;
                    margin: 5px;
                }

                a {
                    color: #03071E;

                    &:hover {
                        color: #FAA307;
                        border-bottom: 2px solid #FAA307;
                        border-radius: 10px;
                    }

                    @media screen and (max-width: 992px) {
                        color: white;
                        border-bottom: none;

                    }
                }

                .active {
                    color: #F2C802;
                }
            }

            .icon {
                list-style-type: none;
                display: flex;
                align-items: center;
                justify-content: end;
                gap: 15px;
                width: 200px;
                color: #03071E;

                @media screen and (max-width: 992px) {
                    display: none;
                }

                li {
                    cursor: pointer;

                    &:hover {
                        color: #FAA307;
                    }
                }
            }
        }

        .popup {
            position: fixed;
            top: 85px;
            right: 5px;
            width: 25%;
            height: 25%;
            // transform: translate(-50%, -50%);
            border-radius: 10px;
            z-index: 999;
            background-color: rgba(255, 255, 255, 0.9);

            .popup-content {
                position: relative;
                border-radius: 5px;

                h2 {
                    color: #03071E;
                    font-size: 1.7rem;
                }

                .account {
                    background-color: #F2C802;
                    padding: 5px 10px;
                    border-radius: 10px;
                    margin: 0 5px;
                    font-weight: bold;
                    color: #03071E;

                    &:hover {
                        background-color: #FAA307;
                    }
                }

                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #F2C802;
                    border-radius: 10px;

                    &:hover {
                        background-color: #FAA307;
                    }
                }
            }
        }

        .search {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: 70px;
            // transform: translate(-50%, -50%);
            z-index: 999;
            background-color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;

            .search-content {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                input {
                    width: 100%;
                    background-color: transparent;
                    margin: 0 20px;
                    border-radius: 10px;
                    padding: 5px 5px 5px 55px;
                    border: 1px solid grey;
                    position: relative;
                }

                .form-control:focus {
                    border-color: #F2C802;
                    box-shadow: none;
                }

                span {
                    padding: 9px 15px;
                    position: absolute;
                    top: 17.5px;
                    left: 20px;
                    border-radius: 10px 0 0 10px;
                    background-color: #F2C802;
                    color: white;
                }

                .close-search {
                    background-color: #F2C802;
                    border-radius: 10px;
                    margin-right: 20px;

                    &:hover {
                        background-color: #FAA307;
                    }
                }
            }
        }
    }
}
</style>