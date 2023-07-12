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
    <div class="container pt-5">
        <h2 class="text-black mt-5">Menu del ristorante</h2>
        <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
            <h3 v-if="restaurant.id === selectedRestaurantId">{{ restaurant.name }}</h3>
            <div v-for="dish in restaurant.dishes" :key="dish.id" v-if="restaurant.id === selectedRestaurantId">
                <h4>{{ dish.name }}</h4>
                <p>{{ dish.description }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;
</style>