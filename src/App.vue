<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
      types:[],
      selectedType: "all",
    }
  },
  mounted() {
    this.getRestaurants();
    this.getTypes();
  },
  methods: {    
    getTypes() {
      axios.get('http://localhost:8000/api/types').then(resp => {
        this.types = resp.data.results;
      })
    },
    getRestaurants() {

      const params = {}

      if(this.selectedType !== "all") {
        params.type_id = this.selectedType;
      }

      axios.get('http://localhost:8000/api/restaurants', { params }).then(resp => {
        this.restaurants = resp.data.restaurants;
      })
    },

  }
}

</script>

<template>  


  <!-- filtri -->
  <div class="container">
    <p>

      <label for="type">Tipi di ristoranti</label>
      <select v-model="selectedType"  id="type" class="form-select" @change="getRestaurants()">
        <option value="all">tutte</option>
        <option :value="typeItem.id" v-for="typeItem in types " :key="typeItem.id">{{ typeItem.name }}</option>
      </select>

    </p>

  </div>

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
