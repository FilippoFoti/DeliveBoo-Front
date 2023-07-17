<script>
import { store } from '../store';

export default {
    name: 'NavHeader',
    data() {
        return {
            store,
            showAccount: false,
            showMenuIcon: false,
            showInput: false,
            showSearchIcon: false,
            showCanvas: false,
            showCartIcon: false,
            navList: [
                {
                    name: "Home",
                    routeName: "home"
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
        // CHANGE PAGE
        buttonClicked(button, link) {
            window.open(link, '_blank');
        },
        // buttonClicked(button) {
        //     if (button === 'registrati') {
        //         window.location.href = 'http://localhost:8000/register';
        //     } else if (button === 'login') {
        //         window.location.href = 'http://localhost:8000/login';
        //     }
        // }

        // ACTIVE PAGE
        isActive(route) {
            return this.$route.name === route;
        },

        // ACTIVE REGISTRAZIONE E LOGIN
        showMenu() {
            if (this.showAccount) {
                this.hideMenu();
                this.showMenuIcon = false;

            } else {
                this.showAccount = true;
                this.showMenuIcon = !this.showMenuIcon;
            }
        },
        hideMenu() {
            this.showAccount = false;
            this.showMenuIcon = false;
        },


        // ACTIVE SEARCH
        showSearch() {
            if (this.showInput) {
                this.hideSearch();
                this.showSearchIcon = false;
            } else {
                this.showInput = true;
                this.showSearchIcon = !this.showSearchIcon;
            }
        },
        hideSearch() {
            this.showInput = false;
            this.showSearchIcon = false;
        },

        // ACTIVE CART
        // showCart() {
        //     if (this.showCanvas) {
        //         this.hideCart();
        //         this.showCanvasIcon = false;
        //     } else {
        //         this.showCanvas = true;
        //         this.showCartIcon = !this.showCartIcon;
        //     }
        // },
        // hideCart() {
        //     this.showCanvas = false;
        //     this.showCartIcon = false;
        // },

        quantityCard() {
            let quantity = 0;
            this.store.cart.forEach(dishe => {
                quantity += dishe.count;
            });
            if (quantity > 99) {
                return '99+';
            }
            return quantity;
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
                        <li @click="showSearch" :class="{ activeButton: showSearchIcon }"><i
                                class="fa-solid fa-magnifying-glass"></i></li>
                        <li @click="showMenu" :class="{ activeButton: showMenuIcon }"><i class="fa-regular fa-user"></i>
                        </li>
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                            aria-controls="offcanvasExample">
                            <li class="position-relative"><i class="fa-solid fa-cart-shopping"></i>
                                <span v-if="store.cart.length > 0" class="translate-middle badge rounded-pill bg-danger">
                                    {{ quantityCard() }}
                                </span>
                            </li>
                        </a>
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
                color: #03071E;

                a {
                    color: #03071E;

                    &:hover {
                        color: #FAA307;
                        border-bottom: 2px solid #FAA307;
                        border-radius: 10px;
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
                width: 200px;
                color: #03071E;

                a {
                    color: #03071E;
                }

                li {
                    cursor: pointer;
                    padding: 0 10px;


                    &:hover {
                        color: #FAA307;
                    }

                    .badge {
                        position: absolute;
                        top: 0;
                        right: -35%;
                        font-size: 0.6rem;
                    }
                }

                .activeButton {
                    background-color: #F2C802;
                    color: #03071E;
                    border-radius: 50%;
                    padding: 5px 10px;

                    li {
                        padding: 0;
                    }

                    &:hover {
                        color: #03071E;
                        background-color: #FAA307;
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
                    border: 1px solid #FAA307;
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
                    color: #03071E;
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

// RESPONSIVE

@media screen and (max-width: 991px) {
    .navbar-collapse {
        margin-top: 24px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: end;
        flex-direction: column;
    }
    header .navbar .container .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    header .navbar .container .menu a:hover {
        color: #03071E;
        border-bottom: none;
    }
    header .navbar .container .menu .active {
        color: #03071E;
    }
}

</style>