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
        }
    },
    mounted() {
        this.getTypes();
        this.getRestaurants();
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
    }
}
</script>

<template>
    <div id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container text-center">
            <p class="m-0">Il servizio di consegna di cibo n. 1 al mondo</p>
            <h1 class="pb-4">Consegnamo il tuo cibo preferito fresco e veloce</h1>
            <router-link to="/restaurants">
                Cosa vuoi mangiare?
            </router-link>
        </div>
    </div>
    <div class="container section-1 my-5">
        <h2 class="text-center mb-4">Le nostre tipologie di cucina</h2>
        <div class="d-flex gap-3 my-3">
            <div class="form-check" v-for="typeItem in types" :key="typeItem.id">
                <input type="checkbox" :id="'type_' + typeItem.id" :value="typeItem.id" v-model="selectedType"
                    @change="getRestaurants" class="form-check-input" />
                <label :for="'type_' + typeItem.id" class="form-check-label">
                    {{ typeItem.name }}
                </label>
            </div>
        </div>
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
                <div class="card h-100">
                    <img :src="state.imagePath(restaurant.image)" alt="" class="card-image-top mw-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.name }}</h5>
                        <p>Cucina:
                            <span v-for="(type, index) in restaurant.types" :key="type.id">
                                {{ type.name }}<span v-if="index < restaurant.types.length - 1">, </span>
                            </span>
                        </p>
                        <router-link :to="{ name: 'restaurant_menu', params: { id: restaurant.id } }"
                            class="btn btn-primary mb-2">
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
            <div class="row row-cols-2">
                <div class="col">
                    <h2 class="text-center text-white fw-bold fs-1">Ordina il tuo cibo preferito con l'app DeliveBoo
                    </h2>
                    <p class="text-center text-white fs-5">Paga in app, accumula punti, monitora i tuoi ordini in tempo
                        reale e molto altro.</p>
                </div>
                <div class="col d-flex align-items-center justify-content-center">
                    <div class="download d-flex">
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
            </div>
        </div>
    </div>
    <img class="wave-rotate" src="../assets/img/wave-2.svg" alt="">
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

#hero {
    width: 100%;
    height: 100vh;
    background-image: url(/src/assets/img/hero-home.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    p {
        font-size: 1.5rem;
        color: white;
    }

    h1 {
        width: 70%;
        margin: 0 auto;
        font-size: 2.7rem;
        color: white;
        font-weight: bold;
    }

    a {
        text-decoration: none;
        border: 1px solid #F2C802;
        border-radius: 10px;
        background-color: #F2C802;
        padding: 10px 15px;
        font-weight: bold;
        color: white;
        font-size: 1.2rem;

        &:hover {
            background-color: #FAA307;
            transform: scale(1.5);
            transition: 1s;
        }
    }
}

.section-1 {

    h2 {
        font-size: 2rem;
        color: #03071E;
        font-weight: bold;
    }

    figure {
        width: 100%;
        height: 250px;

        img {
            height: 100%;
            width: 100%;
        }
    }

    h5 {
        font-weight: bold;
        font-size: 1.5rem;
    }
}

.wave-2 {
    width: 100%;
}

.section-2 {
    height: 200px;
    background-color: #DC2F02;

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

            h4 {
                font-size: 1.2rem;
                color: white;
            }

            &:hover {
                background-color: #242947;
                cursor: pointer;
                transform: scale(1.1);
                transition: 1s;
            }
        }

    }
}

.wave-rotate {
    width: 100%;
    transform: rotate(180deg);
}

.div-below {
    background-color: #e9ecef;
    padding: 10px;
    margin-top: 10px;
}
</style>