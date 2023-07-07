<script>
  import axios from 'axios' ;

  export default {
    data() {
      return {
        restaurants: []
      }
    },
    mounted() {
      this.getRestaurants();
    },
    methods: {
      getRestaurants() {
        axios.get('http://127.0.0.1:8000/api/restaurants').then(resp => {
          this.restaurants = resp.data.results;
        })
      }
    }
  }

</script>

<template>
  <div class="container">
    <h1>lista ristoranti</h1>
    <div class="row row-cols-4">
      <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card">
          <h3> {{ restaurant.name }}</h3>
        </div>
      </div>
    </div>
  </div>
  

</template>

<style lang="scss">
  @use "./styles/general.scss";
</style>
