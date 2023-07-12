<script>
import axios from 'axios';
import { state } from '../state';
export default {
    name: "restaurant_menu",
    data() {
        return {
            state,
            restaurants: [],
            dishes: [],
            selectedRestaurantId: null,
        }
    },
    mounted() {
        this.getRestaurants(),
            this.selectedRestaurantId = parseInt(this.$route.params.id);
    },
    methods: {
        getRestaurants() {
            axios
                .get("http://localhost:8000/api/restaurants")
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
    <div class="container">
        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <h3 v-if="restaurant.id === selectedRestaurantId">Menu: {{ restaurant.name }}</h3>
            <div class="row row-cols-4">
                <div v-for="dishe in restaurant.dishes" :key="dishe.id" v-if="restaurant.id === selectedRestaurantId"
                    class="col">
                    <div class="card">
                        <img :src="state.imagePath(dishe.image)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4>{{ dishe.name }}</h4>
                            <p>{{ dishe.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

h3 {
    margin-top: 90px;
}
</style>