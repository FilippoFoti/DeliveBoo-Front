<script>
import axios from 'axios';
import { state } from '../state';
export default {
    name: "homePage",
    data() {
        return {
            state,
            types: [],
            restaurants: [],
            selectedType: [],
            selectedRestaurant: null,
            showPaymentSuccess: false
        }
    },
    mounted() {
        this.getTypes();
        this.getRestaurants();
        if (this.$route.query.payment_success === 'true') {
            this.showPaymentSuccess = true;
        }
    },
    methods: {
        getTypes() {
            axios
                .get("http://localhost:8000/api/types")
                .then((resp) => {
                    this.types = resp.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getRestaurants() {
            const params = {};

            if (this.selectedType.length > 0 && this.selectedType.includes("all")) {
                params.type_id = [];
            } else {
                params.type_id = this.selectedType;
            }
            axios
                .get("http://localhost:8000/api/restaurants", { params })
                .then((resp) => {
                    this.restaurants = resp.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        closePaymentSuccess() {
            this.showPaymentSuccess = false;
            this.$router.replace({ query: { payment_success: null } });
        }
    }
}
</script>

<template>
    <div id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container text-center">
            <div v-if="$route.query.payment_success === 'true'" class="alert alert-warning">
                <p class="text-center text-black my-4">Pagamento avvenuto con successo, <br>
                    il tuo ordine sta arrivando!</p>
                <button @click="closePaymentSuccess" class="btn btn-warning close-button">X</button>
            </div>
            <p class="m-0 text-shadow">Il servizio di consegna di cibo n. 1 al mondo</p>
            <h1 class="pb-4 text-shadow">Consegnamo il tuo cibo preferito fresco e veloce</h1>
            <a href="#click" class="btn">
                Cosa vuoi mangiare?
            </a>
        </div>
    </div>

    <div id="click"></div>

    <div class="container section-1 my-5">
        <h2 class="text-center m-0">Le nostre tipologie di cucina</h2>
        <div class="d-flex justify-content-center gap-4 py-5 my_checkbox flex-wrap">
            <div v-for="typeItem in types" :key="typeItem.id">
                <input type="checkbox" :id="'box-' + typeItem.id" :value="typeItem.id" v-model="selectedType"
                    @change="getRestaurants" />
                <label class="fw-bold" :for="'box-' + typeItem.id">
                    {{ typeItem.name }}
                </label>
            </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5">
            <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
                <div class="card h-100 shadow">
                    <figure class="m-0">
                        <img :src="state.imagePath(restaurant.image)" alt="" class="card-image-top">
                    </figure>
                    <div class="card-body text-center">
                        <ul class="m-0 p-0 d-flex gap-1 flex-wrap justify-content-end">
                            <li class="badge rounded-pill py-1 px-2" v-for="(type, index) in restaurant.types"
                                :key="type.id">
                                {{ type.name }}
                                <span v-if="index < restaurant.types.length - 1"></span>
                            </li>
                        </ul>
                        <h5 class="card-title fw-bold text-decoration-underline">{{ restaurant.name }}</h5>
                        <router-link :to="{ name: 'restaurant_menu', params: { id: restaurant.id } }"
                            class="btn fw-bold my-2">
                            Vai nel menu
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <img class="wave-2" src="../assets/img/wave-2.svg" alt="">

    <div class="section-2">
        <div class="container">
            <div class="row row-cols-2 d-flex align-items-center">
                <div class="col">
                    <h2 class="text-center text-white fw-bold text-shadow">Ordina il tuo cibo preferito con l'app DeliveBoo
                    </h2>
                    <p class="text-center text-white text-shadow">Paga in app, accumula punti, monitora i tuoi ordini in
                        tempo
                        reale e molto altro.
                    </p>
                    <div class="download d-flex justify-content-center">
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
                <div class="col text-center">
                    <img src="../assets/img/cellulare.png" alt="" class="w-50">
                </div>
            </div>
        </div>
    </div>

    <!-- <img class="wave-rotate" src="../assets/img/wave-2.svg" alt=""> -->

    <div class="container section-3 my-5">
        <div class="row py-3 d-flex align-items-top">
            <div class="col d-flex align-items-center flex-column">
                <div class="circle d-flex align-items-center justify-content-center shadow">
                    <i class="fa-solid fa-headset"></i>
                </div>
                <p class="text-center pt-4">
                    Il nostro team di assistenza è sempre a disposizione: parla con noi via Chat, Mail o direttamente al
                    telefono!
                </p>
            </div>
            <div class="col d-flex align-items-center flex-column">
                <div class="circle d-flex align-items-center justify-content-center shadow">
                    <i class="fa-regular fa-credit-card"></i>
                </div>
                <p class="text-center pt-4">
                    I pagamenti online sono protetti e certificati. Potrai selezionare tra diverse modalità di pagamento e
                    scegliere quella più adatta a te!
                </p>
            </div>
            <div class="col d-flex align-items-center flex-column">
                <div class="circle d-flex align-items-center justify-content-center shadow">
                    <i class="fa-solid fa-piggy-bank"></i>
                </div>
                <p class="text-center pt-4">
                    Scegli tu quando ricevere il tuo ordine: la consegna è gratuita sopra una certa soglia, potrai
                    verificarlo direttamente al chechout!
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.conferma {
    padding-top: 200px;
}

.my_checkbox {
    margin: auto;

    label:hover {
        color: #fd7e14;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]+label {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    input[type="checkbox"]+label:last-child {
        margin-bottom: 0;
    }

    input[type="checkbox"]+label:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border: 3px solid #fd7e14;
        position: absolute;
        left: 0;
        top: 0;
        opacity: .6;
        -webkit-transition: all .12s, border-color .08s;
        transition: all .12s, border-color .08s;
    }

    input[type="checkbox"]:checked+label:before {
        width: 10px;
        top: -5px;
        left: 5px;
        border-radius: 0;
        opacity: 1;
        border-top-color: transparent;
        border-left-color: transparent;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}

.text-shadow {
    text-shadow: 10px 10px 15px rgba(0, 0, 0, 0.5);
}

#hero {
    width: 100%;
    height: 100vh;
    background-image: url("../assets/img/hero-home.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    p {
        font-size: 1.8rem;
        color: white;
    }

    h1 {
        width: 70%;
        margin: 0 auto;
        font-size: 4rem;
        color: white;
        font-weight: bold;
    }

    a {
        text-decoration: none;
        border: 1px solid #FAA307;
        border-radius: 10px;
        background-color: #F2C802;
        padding: 10px 15px;
        font-weight: bold;
        color: #03071E;
        font-size: 1.2rem;

        &:hover {
            background-color: #FAA307;
            transform: scale(1.1);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
        }
    }
}

#click {
    position: absolute;
    bottom: 40px;
    left: 0;
}

.section-1 {

    h2 {
        font-size: 2.5rem;
        color: #03071E;
        font-weight: bold;
    }

    figure {
        width: 100%;
        height: 200px;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .form-check {
        cursor: pointer;

        label {
            font-size: 1.3rem;
            cursor: pointer;
        }

        .form-check-input {
            background-color: #F2C802;
            font-size: 1.3rem;
            cursor: pointer;
        }

        input[type="checkbox"]:checked {
            background-color: #FAA307;
        }
    }

    .card {
        position: relative;
        border-radius: 10px;

        ul {
            position: absolute;
            top: 10px;
            right: 10px;

            li {
                background-color: #F2C802;
                color: #03071E;
            }
        }

        h5 {
            font-size: 1.5rem;
            color: #03071E;
        }

        a {
            padding: 5px 10px;
            background-color: #F2C802;
            border: 1px solid #FAA307;
            border-radius: 10px;
            color: #03071E;

            &:hover {
                background-color: #FAA307;
                transform: scale(1.1);
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
            }
        }
    }
}

.wave-2 {
    width: 100%;
}

.section-2 {
    background-color: #DC2F02;

    h2 {
        font-size: 2.5rem;
    }

    p {
        font-size: 1.3rem;
    }

    .download {
        .button {
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #03071E;
            margin: 10px;

            i {
                color: white;
                padding-right: 15px;
            }

            p {
                font-size: 1rem;
                color: white;
            }

            h4 {
                font-size: 1.2rem;
                color: #03071E;
            }

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
            }
        }
    }
}

// .wave-rotate {
//     width: 100%;
//     transform: rotate(180deg);
// }
.section-3 {

    .circle {
        width: 100px;
        height: 100px;
        background-color: #e9ecef;
        border-radius: 50%;
        // border: 1px solid #FAA307;

        i {
            color: #03071E;
            font-size: 2rem;
        }
    }

    p {
        font-size: 1.1rem;
        color: #03071E;
    }
}

.alert.alert-success {
    position: relative;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
}


// RESPONSIVE LG--------------------------------------------------------------------------------------

@media screen and (max-width: 1199px) {
    .section-2 {
        background-color: #DC2F02;

        h2 {
            font-size: 2rem;
        }

        p {
            font-size: 1.1rem;
        }
    }

    .alert {
        margin-top: 100px;
    }
}

// RESPONSIVE TABLET---------------------------------------------------------------------

@media screen and (max-width: 991px) {
    #hero {

        p {
            font-size: 1.5rem;
        }

        h1 {
            font-size: 3rem;
        }

        a {
            padding: 8px 12px;
            font-size: 1.1rem;
        }
    }

    .my_checkbox input[type=checkbox]+label[data-v-2d1117dc]:before {
        font-size: 0.8rem;
    }

    .my_checkbox input[type=checkbox]+label {
        font-size: 0.8rem;
    }

    .section-1 {

        h2 {
            font-size: 2rem;
        }

        .card {
            h5 {
                font-size: 1.3rem;
            }

            a {
                padding: 4px 8px;
            }
        }
    }

    .section-2 {
        h2 {
            font-size: 1.7rem;
        }

        p {
            font-size: 0.9rem;
        }

        .download {
            .button {
                padding: 8px;
                margin: 8px;

                i {
                    padding-right: 15px;
                }

                p {
                    font-size: 0.6rem;

                }

                h4 {
                    font-size: 0.9rem;
                }
            }
        }
    }

    .section-3 {

        .circle {
            width: 80px;
            height: 80px;

            i {
                font-size: 1.7rem;
            }
        }

        p {
            font-size: 0.9rem;
        }
    }

    .alert {
        margin-top: 0;
    }
}

// RESPONSIVE CELL---------------------------------------------------------------------

@media screen and (max-width: 767px) {
    #hero {

        p {
            font-size: 1.3rem;
        }

        h1 {
            font-size: 2.5rem;
        }

        a {
            padding: 6px 10px;
            font-size: 0.9rem;
        }
    }

    .my_checkbox input[type=checkbox]+label[data-v-2d1117dc]:before {
        font-size: 0.65rem;
    }

    .section-1 {

        h2 {
            font-size: 1.75rem;
        }
    }

    .section-2 {
        h2 {
            font-size: 1.4rem;
        }

        p {
            font-size: 0.75rem;
        }

        img {
            width: 66% !important;
        }

        .download {
            .button {
                padding: 6.5px;
                margin: 6.5px;

                i {
                    font-size: 1rem;
                    padding-right: 10px;
                }

                p {
                    font-size: 0.5rem;

                }

                h4 {
                    font-size: 0.75rem;
                }
            }
        }
    }

    .section-3 {

        .circle {
            width: 70px;
            height: 70px;

            i {
                font-size: 1.4rem;
            }
        }

        p {
            font-size: 0.8rem;
        }
    }
}
</style>