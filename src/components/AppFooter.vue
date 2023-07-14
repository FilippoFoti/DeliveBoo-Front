<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            joinUs: [
                { name: 'Careers' },
                { name: 'Restaurants' },
                { name: 'About' },
                { name: 'Become a Courier' }
            ],
            letUs: [
                { name: 'Help Center' },
                { name: 'Support' },
                { name: 'Contacts' }
            ],
            followUs: [
                { name: 'Twitter' },
                { name: 'Facebook' },
                { name: 'Instagram' }
            ],
            privacy: [
                { name: 'Privacy Policy' },
                { name: 'Terms & Conditions' },
                { name: 'Cookies Policy' }
            ]
        }
    }
}
</script>

<template>
    <img class="wave" src="../assets/img/wave.svg" alt="">
    <footer class="px-4 pb-4">
        <div class="container">
            <div class="row">
                <div class="col-3 logo pt-4">
                    <router-link to="/">
                        <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/rubber-156597_1280.png" alt="Logo">
                        <p class="m-0 ps-2">DeliveBoo</p>
                    </router-link>
                </div>
                <div class="col-2 pt-4">
                    <h2 class="m-0">Join us</h2>
                    <ul>
                        <li v-for="list in joinUs">
                            <a href="">{{ list.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-2 pt-4">
                    <h2 class="m-0">Let us help you</h2>
                    <ul>
                        <li v-for="list in letUs">
                            <a href="">{{ list.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-2 pt-4">
                    <h2 class="m-0">Follow us</h2>
                    <ul>
                        <li v-for="list in followUs">
                            <a href="">{{ list.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-3 pt-4">
                    <h2 class="m-0">Download our app</h2>
                    <div class="download">
                        <div class="button d-flex align-items-center">
                            <i class="fa-brands fa-apple fa-2xl"></i>
                            <div class="text">
                                <p class="m-0">Download on the</p>
                                <h4 class="m-0">App Store</h4>
                            </div>
                        </div>
                        <div class="button d-flex align-items-center">
                            <i class="fa-brands fa-google-play fa-xl"></i>
                            <div class="text">
                                <p class="m-0">Download on the</p>
                                <h4 class="m-0">Google Play</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-5">
                <div class="col-12 mb-4">
                    <h3 class="m-0">@ All rights reserved. Made by DeliveBoo</h3>
                    <ul>
                        <li v-for="list in privacy">
                            <a href="">{{ list.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.wave {
    width: 100%;
}

footer {
    background-color: #03071E;

    .container {
        .logo {
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
        }

        .col-2,
        .col-3 {
            h2 {
                font-size: 1.2rem;
                padding-bottom: 16px;
                color: white;
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;

                a {
                    font-size: 1rem;
                    text-decoration: none;
                    color: grey;
                }
            }

            ul li a:hover {
                color: white;
            }

            .download {
                .button {
                    padding: 15px;
                    border-radius: 10px;
                    border: 1px solid white;
                    margin: 10px;
                    background-color: #03071E;

                    i {
                        color: white;
                        padding-right: 15px;
                    }

                    p {
                        font-size: 1rem;
                        color: grey;
                    }

                    h4{
                        font-size: 1.2rem;
                        color: white;
                    }

                    &:hover {
                        background-color:#242947;
                        cursor: pointer;
                        transform: scale(1.1);
                        transition: 1s;
                    }
                }

            }
        }

        hr {
            color: white;
        }

        .col-12 {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3 {
                font-size: 1rem;
                color: grey;
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                gap: 15px;

                a {
                    font-size: 0.8rem;
                    text-decoration: none;
                    color: grey;
                }
            }
        }
    }
}
</style>