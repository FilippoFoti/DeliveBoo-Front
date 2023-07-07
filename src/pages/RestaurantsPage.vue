<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
      types: [],
      selectedType: [],
    }
  },
  mounted() {
    this.getRestaurants();
    this.getTypes();
  },
  methods: {
    getTypes() {
      axios.get('http://localhost:8000/api/types')
        .then(resp => {
          this.types = resp.data.results;
        })
        .catch(error => {
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

      axios.get('http://localhost:8000/api/restaurants', { params })
        .then(resp => {
          this.restaurants = resp.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <label>Tipi di ristoranti</label>
    <div class="d-flex gap-3">
      <div class="form-check" v-for="typeItem in types" :key="typeItem.id">
        <input type="checkbox" :id="'type_' + typeItem.id" :value="typeItem.id" v-model="selectedType"
          @change="getRestaurants" class="form-check-input" />
        <label :for="'type_' + typeItem.id" class="form-check-label">
          {{ typeItem.name }}
        </label>
      </div>
    </div>

    <h1>Lista ristoranti</h1>
    <div class="row row-cols-4">
      <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card">
          <h3>{{ restaurant.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/general.scss" as *;
</style>

