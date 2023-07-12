<script>
import axios from 'axios';
import { state } from '../state';
export default {
    name: "restaurant_menu",
    data() {
        return {
            state,
            selectedRestaurant: null,
            dishes: [],
        }
    },
    props: ['id'], // restaurant id passed from route params
    mounted() {
        this.getRestaurant();
        this.getDishes();
    },
    methods: {
        getRestaurant() {
            axios
                .get(`http://localhost:8000/api/restaurants/${this.id}`)
                .then((resp) => {
                    this.selectedRestaurant = resp.data.result;
                    console.log(resp)
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        getDishes() {
            axios
                .get(`http://localhost:8000/api/restaurants/${this.id}/dishes`)
                .then((resp) => {
                    this.dishes = resp.data.results;
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
        <h2 class="p-5 text-black">{{ selectedRestaurant.name }}</h2>
        <div class="row">
            <div class="col-md-6" v-for="dish in dishes" :key="dish.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ dish.name }}</h5>
                        <p class="card-text">{{ dish.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;
</style>
